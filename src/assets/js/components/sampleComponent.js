import { Component } from '../classes/component';

/**
 *
 *
 * @class sampleComponent
 * @extends {Component}
 */
class sampleComponent extends Component {

  /**
   * Creates an instance of sampleComponent.
   *
   * @memberof sampleComponent
   */
  constructor() {
    super('C00');

    if (super.exists()) {
      const self = this;
      self.element = self.elements[0];

      self.constructor.sampleStaticMethod({ name: 'Static Method', type: 123 });

      self.sampleMethod('test');
    }
  }

  /**
   * Sample static method
   *
   * @static
   * @returns {undefined}
   * @param {obj} obj sample obj
   * @param {string} obj.name Sample Name
   * @param {number} obj.type Sample Type
   *
   * @memberof sampleComponent
   */
  static sampleStaticMethod(obj) {
    console.log(obj.name, obj.type);
  }

  /**
   * Sample Method
   *
   * @param {string} param sample param
   * @returns {undefined}
   * @memberof sampleComponent
   */
  sampleMethod(param) {
    const self = this;

    console.log(self.element, param);
  }
}

export { sampleComponent };
