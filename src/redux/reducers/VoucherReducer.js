import {
  FECTH_VOUCHER_REQUEST,
  FECTH_VOUCHER_SUCCESS,
  FECTH_VOUCHER_FAILURE,
} from "../constants";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

  
  const voucherReducer = (state = initialState, action) => {
    switch (action.type) {
      case FECTH_VOUCHER_REQUEST:
        return { ...state, loading: true };
      case FECTH_VOUCHER_SUCCESS:
        return { ...state, data: action.payload, loading: false };
      case FECTH_VOUCHER_FAILURE:
        return { ...state, error: action.error, loading: false };
      case ADD_VOUCHER_SUCCESS:
        return { ...state, data: [...state.data, action.payload] };
      case UPDATE_VOUCHER_SUCCESS:
        return {
          ...state,
          data: state.data.map(voucher =>
            voucher._id === action.payload._id ? action.payload : voucher
          ),
        };
      case 'DELETE_VOUCHER_SUCCESS':
        return {
          ...state,
          data: state.data.filter(voucher => voucher._id !== action.payload._id),
        };
      default:
        return state;
    }
  };
  
  export default voucherReducer;
  
  