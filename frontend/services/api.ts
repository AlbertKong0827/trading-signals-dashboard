import axios from "axios";

const API_URL = "http://localhost:8000";

export const fetchTradingSignals = async () => {
    const response = await axios.get(`${API_URL}/trading-signals/`);
    return response.data;
};
