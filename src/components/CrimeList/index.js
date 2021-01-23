import React, {useEffect, useState} from 'react';
import {Table} from 'antd';
import axios from '../../api/RequestInterceptor'
import './styles.css'

const CrimeList = () => {
    const [state, setState] = useState({
        selectedCategory: '',
        categories: [],
        data: [],
        date: '2020-01',
        selectedForce: 'surrey'
    })
    const {categories, selectedCategory, data, date, selectedForce} = state;
    useEffect(() => {
        (async () => {
            try {
                const categoriesResponse = await axios.get(`${process.env.REACT_APP_API_URL}crime-categories?date=${date}`)
                const dataResponse = await axios.get(`${process.env.REACT_APP_API_URL}crimes-no-location?category=${selectedCategory}&force=${selectedForce}&date=${date}`)
                setState({
                    ...state,
                    data: dataResponse.data,
                    categories: categoriesResponse.data,
                    selectedCategory: categoriesResponse.data[0]?.url || ''
                })
            } catch (error) {
                alert(error.message)
            }
        })()
    }, [])
    useEffect(() => {
        (async () => {
            try {
                const dataResponse = await axios.get(`${process.env.REACT_APP_API_URL}crimes-no-location?category=${selectedCategory}&force=${selectedForce}&date=${date}`)
                setState({
                    ...state,
                    data: dataResponse.data
                })
            } catch (error) {
                alert(error.message)
            }
        })()
    }, [selectedCategory])
    const handleCategoryChange = (e) => {
        setState({...state, selectedCategory: e.target.value})
    }
    const columns = [
        {
            title: 'Category',
            dataIndex: 'category',
            key: "category"
        },
        {
            title: 'Month',
            dataIndex: 'month',
            key: "month"
        },
        {
            title: 'Outcome',
            key: "outcome",
            render: (text, record) => (
                <span>
                    {record.outcome_status.category}
                </span>
            ),
        },
    ]
    return (
        <div>
            <h2>UK CRIME TRACING APP</h2>
            <select className={`select`} onChange={handleCategoryChange} value={selectedCategory}>
                {
                    categories.map((category, categoryIndex) => (
                        <option key={categoryIndex} value={category.url}>{category.name}</option>
                    ))
                }
            </select>
            <Table columns={columns} dataSource={data}/>
        </div>
    )
}

export default CrimeList
