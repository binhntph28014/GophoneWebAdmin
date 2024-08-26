import {
  FECTH_VOUCHER_REQUEST,
  FECTH_VOUCHER_SUCCESS,
  FECTH_VOUCHER_FAILURE,
  FECTH_VOUCHER_PRODUCT_REQUEST,
} from "../constants";

export const fetchVoucherRequest = () => {
  return {
    type: FECTH_VOUCHER_REQUEST,
  };
};

export const fetchVoucherSuccess = (data) => {
  return {
    type: FECTH_VOUCHER_SUCCESS,
    payload: data,
  };
};
export const fetchVoucherFailure = (error) => {
  return {
    type: FECTH_VOUCHER_FAILURE,
    payload: error,
  };
};

export const fetchVoucherDetailRequest = ( id) => {
  return {
    type: FECTH_VOUCHER_PRODUCT_REQUEST,
    payload: {  id },
  };
};
