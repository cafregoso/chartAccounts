import axios from 'axios'

class ChartDataService {
    get_all() {
        return axios.get('http://localhost:8000/api/charts/')
    }

    get_one(id) {
        return axios.get(`http://localhost:8000/api/chart/${id}`)
    }

    create_chart(data) {
        axios.defaults.headers.post['Content-Type'] = 'application/json'
        return axios.post(`http://localhost:8000/api/chart/`, data)
    }

    update_chart(id, data) {
        return axios.put(`http://localhost:8000/api/chart/${id}`, data)
    }

    delete_chart(id) {
        return axios.delete(`http://localhost:8000/api/chart/${id}`)
    }
}

export default new ChartDataService()