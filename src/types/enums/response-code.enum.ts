enum ResponseCode {
  SUCCESS = 'SU',
  VALIDATION_FAIL = 'VF',
  DUPLICATE_EMAIL = 'DE',
  DUPLICATE_NICKNAME = 'DN',
  DUPLICATE_TEL_NUMBER = 'DT',
  NO_EXIST_USER = 'NU',
  NO_EXIST_BOARD = 'NB',
  SIGN_IN_FAIL = 'SF',
  AUTHORIZATION_FAIL = 'AF',
  NO_PERMISSION = 'NP',
  DATABASE_ERROR = 'DBE',
}

export default ResponseCode;