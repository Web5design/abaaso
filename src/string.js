/** @namespace string */
var string = {
	/**
	 * Capitalizes the String
	 *
	 * @method capitalize
	 * @param  {String}  obj String to capitalize
	 * @param  {Boolean} all [Optional] Capitalize each word
	 * @return {String}      Capitalized String
	 */
	capitalize : function ( obj, all ) {
		all = ( all === true );

		var result;

		if ( all ) {
			result = string.explode( obj, " " ).map( function ( i ) {
				return i.charAt( 0 ).toUpperCase() + i.slice( 1 );
			}).join(" ");
		}
		else {
			result = obj.charAt( 0 ).toUpperCase() + obj.slice( 1 );
		}

		return result;
	},

	/**
	 * Escapes meta characters within a string
	 *
	 * @method escape
	 * @param  {String} obj String to escape
	 * @return {String}     Escaped string
	 */
	escape : function ( obj ) {
		return obj.replace( /[\-\[\]{}()*+?.,\\\^\$|#\s]/g, "\\$&" );
	},

	/**
	 * Splits a string on comma, or a parameter, and trims each value in the resulting Array
	 *
	 * @method explode
	 * @param  {String} obj String to capitalize
	 * @param  {String} arg String to split on
	 * @return {Array}      Array of the exploded String
	 */
	explode : function ( obj, arg ) {
		arg = arg || ",";

		return string.trim( obj ).split( new RegExp( "\\s*" + arg + "\\s*" ) );
	},

	/**
	 * Creates a String representation of an Object, preserving Functions
	 *
	 * Nested Objects are not supported
	 *
	 * @method fromObject
	 * @param  {Object} obj  Object to convert
	 * @param  {String} name [Optional] Name of Object
	 * @return {String}      String representation
	 */
	fromObject : function ( obj, name ) {
		var result = ( name ? name + " = {" : "{" ) + "\n";

		utility.iterate( obj, function ( v, k ) {
			result += "\"" + k + "\":" + v.toString() + ",\n";
		} );

		result = result.replace( /\[object Object\]/g, "{}" ).replace( /,\n$/, "\n" ) + "}";

		return result;
	},

	/**
	 * Replaces all spaces in a string with dashes
	 *
	 * @method hyphenate
	 * @param  {String} obj   String to hyphenate
	 * @param {Boolean} camel [Optional] Hyphenate camelCase
	 * @return {String}       String with dashes instead of spaces
	 */
	hyphenate : function ( obj, camel ) {
		var result = string.trim( obj ).replace( /\s+/g, "-" );

		if ( camel === true ) {
			result = result.replace( /([A-Z])/g, "-$1" ).toLowerCase();
		}

		return result;
	},

	/**
	 * Tests if a string is alpha-numeric
	 *
	 * @method isAlphaNum
	 * @param  {String}  obj String to test
	 * @return {Boolean}     Result of test
	 */
	isAlphaNum : function ( obj ) {
		return validate.test( {alphanum: obj} ).pass;
	},

	/**
	 * Tests if a string is a boolean
	 *
	 * @method isBoolean
	 * @param  {String}  obj String to test
	 * @return {Boolean}     Result of test
	 */
	isBoolean : function ( obj ) {
		return validate.test( {"boolean": obj} ).pass;
	},

	/**
	 * Tests if a string a date
	 *
	 * @method isDate
	 * @param  {String}  obj String to test
	 * @return {Boolean}     Result of test
	 */
	isDate : function ( obj ) {
		return validate.test( {date: obj} ).pass;
	},

	/**
	 * Tests if a string is a domain
	 *
	 * @method isDomain
	 * @param  {String}  obj String to test
	 * @return {Boolean}     Result of test
	 */
	isDomain : function ( obj ) {
		return validate.test( {domain: obj} ).pass;
	},

	/**
	 * Tests if a string is an email address
	 *
	 * @method isEmail
	 * @param  {String}  obj String to test
	 * @return {Boolean}     Result of test
	 */
	isEmail : function ( obj ) {
		return validate.test( {email: obj} ).pass;
	},

	/**
	 * Tests if a string is empty
	 *
	 * @method isEmpty
	 * @param  {String}  obj String to test
	 * @return {Boolean}     Result of test
	 */
	isEmpty : function ( obj ) {
		return ( string.trim( obj ) === "" );
	},

	/**
	 * Tests if a string is an IP address
	 *
	 * @method isIP
	 * @param  {String}  obj String to test
	 * @return {Boolean}     Result of test
	 */
	isIP : function ( obj ) {
		return validate.test( {ip: obj} ).pass;
	},

	/**
	 * Tests if a string is an integer
	 *
	 * @method isInt
	 * @param  {String}  obj String to test
	 * @return {Boolean}     Result of test
	 */
	isInt : function ( obj ) {
		return validate.test( {integer: obj} ).pass;
	},

	/**
	 * Tests if a string is a number
	 *
	 * @method isNumber
	 * @param  {String}  obj String to test
	 * @return {Boolean}     Result of test
	 */
	isNumber : function ( obj ) {
		return validate.test( {number: obj} ).pass;
	},

	/**
	 * Tests if a string is a phone number
	 *
	 * @method isPhone
	 * @param  {String}  obj String to test
	 * @return {Boolean}     Result of test
	 */
	isPhone : function ( obj ) {
		return validate.test( {phone: obj} ).pass;
	},

	/**
	 * Tests if a string is a URL
	 *
	 * @method isUrl
	 * @param  {String}  obj String to test
	 * @return {Boolean}     Result of test
	 */
	isUrl : function ( obj ) {
		return validate.test( {url: obj} ).pass;
	},

	/**
	 * Returns singular form of the string
	 *
	 * @method singular
	 * @param  {String} obj String to transform
	 * @return {String}     Transformed string
	 */
	singular : function ( obj ) {
		return regex.plural.test( obj ) ? obj.slice( 0, -1 ) : obj;
	},

	/**
	 * Transforms the case of a String into CamelCase
	 *
	 * @method toCamelCase
	 * @param  {String} obj String to capitalize
	 * @return {String}     Camel case String
	 */
	toCamelCase : function ( obj ) {
		var s = string.trim( obj ).replace( /\.|_|-|\@|\[|\]|\(|\)|\#|\$|\%|\^|\&|\*|\s+/g, " " ).toLowerCase().split( regex.space_hyphen ),
		    r = [];

		array.each( s, function ( i, idx ) {
			r.push( idx === 0 ? i : string.capitalize( i ) );
		});

		return r.join( "" );
	},

	/**
	 * Casts a String to a Function
	 *
	 * @method toFunction
	 * @param  {String} obj String to cast
	 * @return {Function}   Function
	 */
	toFunction : function ( obj ) {
		var args = obj.match( regex.args )[1],
		    body = obj.match( regex.body )[1];

		return Function.apply( Function, string.explode( args ).concat( [body] ) );
	},

	/**
	 * Trims the whitespace around a String
	 *
	 * @method trim
	 * @param  {String} obj String to capitalize
	 * @return {String}     Trimmed String
	 */
	trim : function ( obj ) {
		return obj.replace( /^(\s+|\t+)|(\s+|\t+)$/g, "" );
	},

	/**
	 * Uncamelcases the String
	 *
	 * @method unCamelCase
	 * @param  {String} obj String to uncamelcase
	 * @return {String}     Uncamelcased String
	 */
	unCamelCase : function ( obj ) {
		return string.trim( obj.replace( /([A-Z])/g, " $1" ).toLowerCase() );
	},

	/**
	 * Uncapitalizes the String
	 *
	 * @method uncapitalize
	 * @param  {String} obj String to uncapitalize
	 * @return {String}     Uncapitalized String
	 */
	uncapitalize : function ( obj ) {
		obj = string.trim( obj );

		return obj.charAt( 0 ).toLowerCase() + obj.slice( 1 );
	},

	/**
	 * Replaces all hyphens with spaces
	 *
	 * @method unhyphenate
	 * @param  {String}  obj  String to unhypenate
	 * @param  {Boolean} caps [Optional] True to capitalize each word
	 * @return {String}       Unhyphenated String
	 */
	unhyphenate : function ( obj, caps ) {
		if ( caps !== true ) {
			return string.explode( obj, "-" ).join( " " );
		}
		else {
			return string.explode( obj, "-" ).map( function ( i ) {
				return string.capitalize( i );
			}).join( " " );
		}
	}
};
