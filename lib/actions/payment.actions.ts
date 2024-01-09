import { CreateInvoiceParams } from './shared.types';

export const createInvoice = async (params: CreateInvoiceParams) => {
  const { price_amount, price_currency, order_id, ipn_callback_url, order_description, success_url, cancel_url } =
    params;
  try {
    const axios = require('axios');
    const data = JSON.stringify({
      price_amount,
      price_currency,
      order_id,
      order_description,
      ipn_callback_url,
      success_url,
      cancel_url
    });

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.nowpayments.io/v1/invoice',
      headers: {
        'x-api-key': 'TKMC7DJ-25V4VKK-MQRD2FR-5HTHSBT',
        'Content-Type': 'application/json'
      },
      data
    };

    const response = await axios(config); // 使用await等待请求结果
    console.log(JSON.stringify(response.data));
    return response.data; // 返回从API获取的数据
  } catch (error) {
    console.error(error);
    throw error;
  }
};
