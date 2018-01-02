import { Gene } from '@ephox/boss';
import { TestUniverse } from '@ephox/boss';
import { TextGene } from '@ephox/boss';
import { Option } from '@ephox/katamari';
import Extract from 'ephox/phoenix/api/general/Extract';
import Finder from 'ephox/phoenix/test/Finder';
import { UnitTest, assert } from '@ephox/bedrock';

UnitTest.test('api.Extract.find', function() {
  var doc = TestUniverse(
    Gene('root', 'root', [
      Gene('1', 'div', [
        Gene('1.1', 'p', [
          Gene('1.1.1', 'img', []),
          TextGene('1.1.2', 'post-image text')
        ]),
        Gene('1.2', 'p', [
          TextGene('1.2.1', 'This is text'),
          Gene('1.2.2', 'span', [
            TextGene('1.2.2.1', 'inside a span')
          ]),
          TextGene('1.2.3', 'More text'),
          Gene('1.2.4', 'em', [
            TextGene('1.2.4.1', 'Inside em')
          ]),
          TextGene('1.2.5', 'Last piece of text')
        ])
      ])
    ])
  );

  var check = function (expected, topId, offset) {
    var top = Finder.get(doc, topId);
    var actual = Extract.find(doc, top, offset);
    expected.fold(function () {
      assert.eq(actual.isNone(), true, 'Expected none, actual: some');
    }, function (exp) {
      actual.fold(function () {
        assert.fail('Expected some, actual: none');
      }, function (act) {
        assert.eq(exp.id, act.element().id);
        assert.eq(exp.offset, act.offset());
      });
    });
  };

  /* Note, it's hard to know whether something should favour being at the end of the previous or the start of the next */
  check(Option.some({ id: '1.1.2', offset: 2 }), 'root', 3);
  check(Option.some({ id: '1.2.4.1', offset: 3 }), '1.2', 'This is textinside a spanMore textIns'.length);
});
