import Schema from 'async-validator'
import { Message } from 'element-ui'
class Validator {
  constructor(descriptor) {
    this.validator = new Schema(descriptor)
  }

  async run(data, cb = title => Message.success(title)) {
    try {
      await this.validator.validate(data)
    } catch (e) {
      console.log(e)
      const errorList = e.errors.map(item => `${item.field}:${item.message}`)
      cb && typeof cb === 'function' && cb(e.errors[0].message)
      throw new Error(errorList)
    }
  }
}

export default Validator
