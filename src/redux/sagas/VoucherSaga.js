import { put, takeLatest, call } from "redux-saga/effects";
import axios from "axios";
import { FECTH_VOUCHER_REQUEST } from "../constants";
import { fetchVoucherFailure, fetchVoucherSuccess } from "../actions/voucher";

function* fetchVoucher() {
  try {
    let apiUrl = `${import.meta.env.VITE_BASE_URL}voucher/get-list`;
    const response = yield call(() => axios.get(apiUrl,
        // {headers: {
        //       Authorization: `Bearer ${token}`, // Thêm token vào header
        //     }}
    ));
    yield put(fetchVoucherSuccess(response.data));
  } catch (error) {
    if (error.response) {
      const response = error.response;
      const errorData = response.data;
      yield put(fetchVoucherFailure(errorData));
    } else {
      yield put(fetchVoucherFailure(error.message));
    }
  }
}

export default function* watchFetchVoucher() {
  yield takeLatest(FECTH_VOUCHER_REQUEST, fetchVoucher);
}