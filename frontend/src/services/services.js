import axios from 'axios'

class ChartDataService {
    get_all() {
        return axios.get('/api/charts/')
    }

    get_one(id) {
        return axios.get(`/api/chart/${id}`)
    }

    create_chart(data) {
        axios.defaults.headers.post['Content-Type'] = 'application/json'
        return axios.post(`/api/chart/`, data)
    }

    update_chart(id, data) {
        return axios.put(`/api/chart/${id}`, data)
    }

    delete_chart(id) {
        return axios.delete(`/api/chart/${id}`)
    }
}

export default new ChartDataService()