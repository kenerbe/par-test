var expect = require('chai').expect
var parallel = require('mocha.parallel')
var foo = 'bar'
var beverages = { beer: [ 'PBR', 'AlphaKing', 'SilurianStout' ] }

parallel('A suite of parallel tests', function() {
  it('- test #1 should take about 100ms', function(done){
    expect(foo).to.be.a('string')
    setTimeout(done, 100)
  })
  it('- test #2 should take about 200ms', function(done){
    expect(foo).to.equal('bar')
    setTimeout(done, 200)
  })
  it('- test #3 should take about 300ms', function(done){
    expect(foo).to.have.lengthOf(3)
    setTimeout(done, 300)
  })
  it('- test #4 should take about 400ms', function(done){
    expect(beverages).to.have.property('beer').with.lengthOf(3)
    setTimeout(done, 400)
  })
  it('- test #5 should take about 500ms', function(done){
    expect(beverages.beer[2]).to.equal('SilurianStout')
    setTimeout(done, 500)
  })
})
