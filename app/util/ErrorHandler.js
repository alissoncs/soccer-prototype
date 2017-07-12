import BaseModel from './BaseModel'

export default function ErrorHandler(error, res) {

  let result = {
    message: 'Unexpected error',
    code: 500
  }

  // assign the status code
  if(error && error.code && res) {
    res.status( error.code )
  }

  result.code = error && error.code ? error.code : null

  if( result.code == BaseModel.NOT_FOUND ) {
    result.message = 'Resource not found'
  } else if( result.code = BaseModel.VALIDATION_ERROR) {
    result.message = 'Validation errors'
    if(error.errors)
      result.mapping = error.errors
  }

  if(error && error.message) {
    result.message = error.message
  }

  return result;

}
