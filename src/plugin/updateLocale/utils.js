export function extend() {
	let extended = {};

	// Merge the object into the extended object
	let merge = function (obj) {
		for (let prop in obj) {
			if (obj.hasOwnProperty(prop)) {
				if (Object.prototype.toString.call(obj[prop]) === '[object Object]') {
					// If we're doing a deep merge and the property is an object
					extended[prop] = extend(extended[prop], obj[prop]);
				} else {
					// Otherwise, do a regular merge
					extended[prop] = obj[prop];
				}
			}
		}
	};

	for (let i = 0 ; i < arguments.length; i++) {
		merge(arguments[i]);
	}

	return extended;

}