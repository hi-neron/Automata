'use strict'

class Reply {
  constructor (status, message, error) {
    const STATUS_CODES = {
      '200': 'ok',
      '201': 'created',
      '202': 'acepted',
      '204': 'No content',
      '205': 'Reset content',
      '400': 'Bad request',
      '401': 'Unauthorized',
      '403': 'Forbidden',
      '404': 'Not found',
      '405': 'Methon no allowed'
    }

    const ERROR_CODES = {
      '01': 'usuario ya esta controlando una pieza'
    }

    if (STATUS_CODES[status]) {
      this.body = {
        'status': status,
        'error': error || ERROR_CODES[status],
        'message': message || STATUS_CODES[status]
      }
    } else {
      this.body = {
        'status': '000',
        'message': 'This state does not exists',
        'error': 'This state does not exists'
      }
    }
  }
}

function throwReply (status, message, error) {
  message = message || null
  let reply = new Reply(status, message, error)
  return reply.body
}

module.exports = throwReply
