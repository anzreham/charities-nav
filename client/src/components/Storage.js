const Storage = (function() {
	let myStorage = window.localStorage;

	function get(name) {
		return JSON.parse(myStorage.getItem(name));
	}

	function set(name, value) {
		myStorage.setItem(name, JSON.stringify(value));
	}

	function clear() {
		myStorage.clear();
	}

	return {
		get,
		set,
		clear
	};
})();

export default Storage;
