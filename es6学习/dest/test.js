"use strict";

var _marked = [number].map(regeneratorRuntime.mark);

function number() {
	return regeneratorRuntime.wrap(function number$(_context) {
		while (1) {
			switch (_context.prev = _context.next) {
				case 0:
					_context.next = 2;
					return 1;

				case 2:
					_context.prev = 2;
					_context.next = 5;
					return 2;

				case 5:
					_context.next = 7;
					return 3;

				case 7:
					_context.prev = 7;
					_context.next = 10;
					return 4;

				case 10:
					_context.next = 12;
					return 5;

				case 12:
					return _context.finish(7);

				case 13:
					_context.next = 15;
					return 6;

				case 15:
				case "end":
					return _context.stop();
			}
		}
	}, _marked[0], this, [[2,, 7, 13]]);
}