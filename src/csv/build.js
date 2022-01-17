/**
 * @module build
 */

/**
 * creates an array of objects, mapping values to their corresponding fields
 * and meant to be used in conjunction with {@link module:format}
 * @param {array} array - the array returned from {@link module:format}
 * @return {array} - an array of objects -
 * the objects are records created from the csv file
 * @example
 * const csv =
 * '"MCID","AGENT_SUB_SEQUENCE_ID","AWARD_CATEGORY"
 * "102179999",0,"CLUB"'
 *
 * build(format(csv))
 *
 * returns:
 *
 [{
  AGENT_MASTER_ID: '102179999',
  AGENT_SUB_SEQUENCE_ID: '0',
  AWARD_CATEGORY: 'CLUB'
 }]
 */
export default function build(array) {
  const [fields, ...rows] = array;
  const fieldMap = fields.reduce((accumulator, field) => {
    const [index, value] = field;
    accumulator[index] = value;
    return accumulator;
  }, {});

  return rows.map((record) => {
    return record.reduce((accumulator, record) => {
      const [index, value] = record;
      accumulator[fieldMap[index]] = value;
      return accumulator;
    }, {});
  });
}
