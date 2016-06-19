"use strict";
'use strict';

var _marked = [gen].map(regeneratorRuntime.mark);

function gen() {
	return regeneratorRuntime.wrap(function gen$(_context) {
		while (1) {
			switch (_context.prev = _context.next) {
				case 0:
					_context.next = 2;
					return 1;

				case 2:
					_context.next = 4;
					return 2;

				case 4:
					_context.next = 6;
					return 3;

				case 6:
				case 'end':
					return _context.stop();
			}
		}
	}, _marked[0], this);
}
var g = gen();

g.next();
g.return('foo');
g.next();