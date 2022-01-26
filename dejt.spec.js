const { describe, it } = require('mocha');
const assert = require('assert').strict;
const Dejt = require('./dejt');

describe('Dejt', () => {
  it('should construct with simple ymd string', (done) => {
    const d = new Dejt('2020-01-01');
    assert.strictEqual(d.toString(), '2020-01-01 00:00:00');
    done();
  });

  it('should construct with timestamp', (done) => {
    const d = new Dejt(1604571686);
    assert.strictEqual(d.toString(), '2020-11-05 11:21:26');
    done();
  });

  it('should construct with timestamp as string', (done) => {
    const d = new Dejt('1604571686');
    assert.strictEqual(d.toString(), '2020-11-05 11:21:26');
    done();
  });

  it('should add days', (done) => {
    const d = new Dejt('2021-10-31').addDays(2);
    assert.strictEqual(d.toDateString(), '2021-11-02');
    done();
  });

  it('should remove days', (done) => {
    const d = new Dejt('2021-11-02').removeDays(2);
    assert.strictEqual(d.toDateString(), '2021-10-31');
    done();
  });

  it('should add years', (done) => {
    const d = new Dejt('2021-10-31').addYears(2);
    assert.strictEqual(d.toDateString(), '2023-10-31');
    done();
  });

  it('should remove years', (done) => {
    const d = new Dejt('2021-10-31').removeYears(2);
    assert.strictEqual(d.toDateString(), '2019-10-31');
    done();
  });

  it('should keep hours intact when handling locale', (done) => {
    const d = new Dejt('2020-01-01 13:47:00');
    assert.strictEqual(d.toString(), '2020-01-01 13:47:00');
    done();
  });

  it('should identify past', (done) => {
    const past = new Dejt();
    past.removeHours(1);
    assert.strictEqual(past.isPast(), true);
    done();
  });

  it('should give dates beteen dates', (done) => {
    const d1 = new Dejt('2020-01-01 10:23:00');
    const d2 = new Dejt('2020-01-04 13:47:23');
    const range = d1.range(d2);
    assert.deepStrictEqual(range.map((x) => x.toString()), [
      '2020-01-01 10:23:00',
      '2020-01-02 00:00:00',
      '2020-01-03 00:00:00',
      '2020-01-04 13:47:23',
    ]);
    done();
  });

  it('should handle same date diffrent time', (done) => {
    const d1 = new Dejt('2020-01-01 10:23:00');
    const d2 = new Dejt('2020-01-01 13:47:23');
    const range = d1.range(d2);
    assert.deepStrictEqual(range.map((x) => x.toString()), [
      '2020-01-01 10:23:00',
      '2020-01-01 13:47:23',
    ]);
    done();
  });

  it('should parse date string', (done) => {
    const d = new Dejt(1604571686);
    assert.strictEqual(d.toDateString(), '2020-11-05');
    done();
  });

  it('should detect holidays', (done) => {
    const d = new Dejt('2020-12-24');
    assert.strictEqual(d.isHoliday(), true);
    done();
  });
});
