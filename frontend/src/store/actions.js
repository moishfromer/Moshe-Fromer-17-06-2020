import axios from 'axios';

export const SEND_MESSAGE = 'SEND_MESSAGE';
export const MESSAGE_PENDING = 'MESSAGE_PENDING';
export const MESSAGE_FAIL = 'MESSAGE_FAIL';

export function sendMessage(message)
{
    const request = axios.post('http://localhost:8000/emails/messages/', message);
    return (dispatch) => {
        console.log(1)
        dispatch({
            type: MESSAGE_PENDING,
            payload: true
        })
        return request.then((response) => {
                return dispatch({
                    type   : SEND_MESSAGE,
                    payload: response.data
                })
            }
        ).catch(error => {
            return dispatch({
                type: MESSAGE_FAIL
            })
        });
    }
}