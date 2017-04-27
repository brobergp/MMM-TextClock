/* Magic Mirror
 * Module: MMM-TextClock
 *
 * By Pierre Broberg
 * MIT Licensed.
 */
Module.register("MMM-TextClock",{
	defaults: {
		timeFormat: config.timeFormat, //default timeformat from config, "HH" for 24h or "h" for 12h
		clang: config.language, //make sure you have the language css ready. or change to "en" for english.
		layout: "Field", //options are "Line" and "Field"
		its24: "HOLY SHIT IS IT", //text before hour
		to24: "BLOODY", //text between hour and minute
		after24: "ALREADY?", //text after minute
		marked: "color: white; font-weight: 400;", //css code to mark current time in Field layout
	},

	getScripts: function() {
		return ["moment.js", "moment-timezone.js"];
	},

	getStyles: function() {
		return ["all.css", this.config.clang + ".css"];
	},

	getTranslations: function() {
		return {
			  en: "translations/en.json",
			  de: "translations/de.json",
			  nl: "translations/nl.json",
				sv: "translations/sv.json"
		}
	},

	start: function() {
		Log.info("Starting module: " + this.name);
		var self = this;
		setInterval(function() {
			self.updateDom();
		}, 5 * 1000);
		moment.locale(this.config.clocklang);
	},

	getDom: function() {
		var wrapper = document.createElement("div");
		// set up moment and variables for the clock
		var now = moment();
		var hourSymbol = "HH";
		if (this.config.timeFormat !== 24) { hourSymbol = "h";		}
		timeMinute = now.format("mm");


		// 24H Text layout
		if (this.config.layout == "Line" ) {
			timeHour = now.format(hourSymbol);
		  wrapper.className = "L24Text";
			one = this.translate('ONE');
			two = this.translate('TWO');
			three = this.translate('THREE');
			four = this.translate('FOUR');
			five = this.translate('FIVE');
			six = this.translate('SIX');
			seven = this.translate('SEVEN');
			eight = this.translate('EIGHT');
			nine = this.translate('NINE');
			ten = this.translate('TEN');
			eleven = this.translate('ELEVEN');
			twelve = this.translate('TWELVE');
			thirteen = this.translate('THIRTEEN');
			forteen = this.translate('FORTEEN');
			fifteen = this.translate('FIFTEEN');
			sixteen = this.translate('SIXTEEN');
			seventeen = this.translate('SEVENTEEN');
			eighteen = this.translate('EIGHTEEN');
			nineteen = this.translate('NINETEEN');
			twenty = this.translate('TWENTY');
			thirty = this.translate('THIRTY');
			forty = this.translate('FORTY');
			fifty = this.translate('FIFTY');
			oh = this.translate('OH');
			zero = this.translate('ZERO');

			function NTT( n ) {
				// this function is taken from user McShaman @ http://stackoverflow.com/questions/14766951/convert-digits-into-words-with-javascript
		    var string = n.toString(), units, tens, scales, start, end, chunks, chunksLen, chunk, ints, i, word, words, and = 'and';

		    /* Is number zero? */
		    if( parseInt( string ) === 0 ) {
		        return zero;
		    }
				/* Array of units as words */
				units = [ ' ', one, two, three, four, five, six, seven, eight, nine, ten, eleven, twelve, thirteen, forteen, fifteen, sixteen, seventeen, eighteen, nineteen ];
				/* Array of tens as words */
				tens = [ oh, '', twenty, thirty, forty, fifty, 'sixty', 'seventy', 'eighty', 'ninety' ];

		    /* Array of scales as words */
		    scales = [ '', 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion', 'decillion', 'undecillion', 'duodecillion', 'tredecillion', 'quatttuor-decillion', 'quindecillion', 'sexdecillion', 'septen-decillion', 'octodecillion', 'novemdecillion', 'vigintillion', 'centillion' ];

		    /* Split user arguemnt into 3 digit chunks from right to left */
		    start = string.length;
		    chunks = [];
		    while( start > 0 ) {
		        end = start;
		        chunks.push( string.slice( ( start = Math.max( 0, start - 3 ) ), end ) );
		    }

		    /* Check if function has enough scale words to be able to stringify the user argument */
		    chunksLen = chunks.length;
		    if( chunksLen > scales.length ) {
		        return '';
		    }

		    /* Stringify each integer in each chunk */
		    words = [];
		    for( i = 0; i < chunksLen; i++ ) {

		        chunk = parseInt( chunks[i] );

		        if( chunk ) {

		            /* Split chunk into array of individual integers */
		            ints = chunks[i].split( '' ).reverse().map( parseFloat );

		            /* If tens integer is 1, i.e. 10, then add 10 to units integer */
		            if( ints[1] === 1 ) {
		                ints[0] += 10;
		            }

		            /* Add scale word if chunk is not zero and array item exists */
		            if( ( word = scales[i] ) ) {
		                words.push( word );
		            }

		            /* Add unit word if array item exists */
		            if( ( word = units[ ints[0] ] ) ) {
		                words.push( word );
		            }

		            /* Add tens word if array item exists */
		            if( ( word = tens[ ints[1] ] ) ) {
		                words.push( word );
		            }

		            /* Add hundreds word if array item exists */
		            if( ( word = units[ ints[2] ] ) ) {
		                words.push( word + ' hundred' );
		            }

		        }

		    }

		    return words.reverse().join( ' ' );
			}

			var lineits = document.createElement('span');
			lineits.className = "t24its";
			lineits.innerHTML = this.config.its24;
			var linehour = document.createElement('span');
			linehour.className = "t24h";
			linehour.innerHTML = " " + NTT(timeHour);
			var lineto = document.createElement('span');
			lineto.className = "t24to";
			lineto.innerHTML = " " + this.config.to24;
			var linemin = document.createElement('span');
			linemin.className = "t24m";

			ohhundred = NTT(timeMinute);
			if (ohhundred == this.translate('ZERO')) {
				ohhundred = this.translate('HUNDRED')
			}

			linemin.innerHTML = " " + ohhundred;
			var lineaft = document.createElement('span');
			lineaft.className = "t24a";
			lineaft.innerHTML = " " + this.config.after24;

			wrapper.appendChild(lineits);
			wrapper.appendChild(linehour);
			wrapper.appendChild(lineto);
			wrapper.appendChild(linemin);
			wrapper.appendChild(lineaft);
		}

		// 12H text layout
		else if (this.config.layout == "Field") {
			timeHour = now.format("h");
		  wrapper.className = "L12Field";

		// Swedish layout
		if (config.language == "sv") {

			var ul1 = document.createElement("ul");
			ul1.className = "ul1";

				var litis = document.createElement("li");
				litis.className = "litis";
				litis.style.cssText = this.config.marked;
				litis.innerHTML = this.translate('ITIS');

				var lifive = document.createElement("li");
				lifive.className = "lifive";
				lifive.innerHTML = this.translate('FIVE');

				var lquarter = document.createElement("li");
				lquarter.className = "lquarter";
				lquarter.innerHTML = this.translate('QUARTER');

				ul1.appendChild(litis);
				ul1.appendChild(lifive);
				ul1.appendChild(lquarter);


			var ul2 = document.createElement("ul");
			ul2.className = "ul2";

				var litwenty = document.createElement("li");
				litwenty.className = "litwenty";
				litwenty.innerHTML = this.translate('TWENTY');

				var liten = document.createElement("li");
				liten.className = "liten";
				liten.innerHTML = this.translate('TEN');

				var lto = document.createElement("li");
				lto.className = "lto";
				lto.innerHTML = this.translate('TO');

				var lpast = document.createElement("li");
				lpast.className = "lpast";
				lpast.innerHTML = this.translate('PAST');

				var lhalf = document.createElement("li");
				lhalf.className = "lhalf";
				lhalf.innerHTML = this.translate('HALF');

				ul2.appendChild(litwenty);
				ul2.appendChild(liten);
				ul2.appendChild(lto);
				ul2.appendChild(lpast);
				ul2.appendChild(lhalf);

			var ul3 = document.createElement("ul");
			ul3.className = "ul3";

				var li1 = document.createElement("li");
				li1.className = "li1";
				li1.innerHTML = this.translate('ONE');

				var li2 = document.createElement("li");
				li2.className = "li2";
				li2.innerHTML = this.translate('TWO');

				var li3 = document.createElement("li");
				li3.className = "li3";
				li3.innerHTML = this.translate('THREE');

				var li4 = document.createElement("li");
				li4.className = "li4";
				li4.innerHTML = this.translate('FOUR');

				ul3.appendChild(li1);
				ul3.appendChild(li2);
				ul3.appendChild(li3);
				ul3.appendChild(li4);

			var ul4 = document.createElement("ul");
			ul4.className = "ul4";

				var li5 = document.createElement("li");
				li5.className = "li5";
				li5.innerHTML = this.translate('FIVE');

				var li6 = document.createElement("li");
				li6.className = "li6";
				li6.innerHTML = this.translate('SIX');

				var li7 = document.createElement("li");
				li7.className = "li7";
				li7.innerHTML = this.translate('SEVEN');

				var li8 = document.createElement("li");
				li8.className = "li8";
				li8.innerHTML = this.translate('EIGHT');

				ul4.appendChild(li5);
				ul4.appendChild(li6);
				ul4.appendChild(li7);
				ul4.appendChild(li8);

			var ul5 = document.createElement("ul");
			ul5.className = "ul5";

				var li9 = document.createElement("li");
				li9.className = "li9";
				li9.innerHTML = this.translate('NINE');

				var li10 = document.createElement("li");
				li10.className = "li10";
				li10.innerHTML = this.translate('TEN');

				var li11 = document.createElement("li");
				li11.className = "li11";
				li11.innerHTML = this.translate('ELEVEN');

				var li12 = document.createElement("li");
				li12.className = "li12";
				li12.innerHTML = this.translate('TWELVE');

				ul5.appendChild(li9);
				ul5.appendChild(li10);
				ul5.appendChild(li11);
				ul5.appendChild(li12);

				if (timeMinute  >= 25 ) {
					nowplus = moment().add(1, 'h');
					timeHour = nowplus.format('h');
					eval("li" + timeHour).style.cssText = this.config.marked;
				}
				else {
					eval("li" + timeHour).style.cssText = this.config.marked;
			}
			if (timeMinute >= 5 && timeMinute < 10) {
				lifive.style.cssText = this.config.marked;
				lpast.style.cssText = this.config.marked;
			}
			else if (timeMinute >= 10 && timeMinute < 15) {
				liten.style.cssText = this.config.marked;
				lpast.style.cssText = this.config.marked;
			}
			else if (timeMinute >= 15 && timeMinute < 20) {
				lquarter.style.cssText = this.config.marked;
				lpast.style.cssText = this.config.marked;
			}
			else if (timeMinute >= 20 && timeMinute < 25) {
				litwenty.style.cssText = this.config.marked;
				lpast.style.cssText = this.config.marked;
			}
			else if (timeMinute >= 25 && timeMinute < 30) {
				lifive.style.cssText = this.config.marked
				lto.style.cssText = this.config.marked;
				lhalf.style.cssText = this.config.marked;
			}
			else if (timeMinute >= 30 && timeMinute < 35) {
				lhalf.style.cssText = this.config.marked;
			}
			else if (timeMinute >= 35 && timeMinute < 40) {
				lifive.style.cssText = this.config.marked;
				lpast.style.cssText = this.config.marked;
				lhalf.style.cssText = this.config.marked;
			}
			else if (timeMinute >= 40 && timeMinute < 45) {
				litwenty.style.cssText = this.config.marked;
				lto.style.cssText = this.config.marked;
			}
			else if (timeMinute >= 45 && timeMinute < 50) {
				lquarter.style.cssText = this.config.marked;
				lto.style.cssText = this.config.marked;
			}
			else if (timeMinute >= 50 && timeMinute < 55) {
				liten.style.cssText = this.config.marked;
				lto.style.cssText = this.config.marked;
			}
			else if (timeMinute >= 55 && timeMinute < 60) {
				lifive.style.cssText = this.config.marked;
				lto.style.cssText = this.config.marked;
			}
			else {}

			wrapper.appendChild(ul1);
			wrapper.appendChild(ul2);
			wrapper.appendChild(ul3);
			wrapper.appendChild(ul4);
			wrapper.appendChild(ul5);
		}

		// German Layout
		else if (config.language == "de") {

			var ul1 = document.createElement("ul");
			ul1.className = "ul1";

				var litis = document.createElement("li");
				litis.className = "litis";
				litis.style.cssText = this.config.marked;
				litis.innerHTML = this.translate('ITIS');

				var lifive = document.createElement("li");
				lifive.className = "lifive";
				lifive.innerHTML = this.translate('FIVE');

				var liten = document.createElement("li");
				liten.className = "liten";
				liten.innerHTML = this.translate('TEN');

				ul1.appendChild(litis);
				ul1.appendChild(lifive);
				ul1.appendChild(liten);

			var ul2 = document.createElement("ul");
			ul2.className = "ul2";

				var lquarter = document.createElement("li");
				lquarter.className = "lquarter";
				lquarter.innerHTML = this.translate('QUARTER');

				var litwenty = document.createElement("li");
				litwenty.className = "litwenty";
				litwenty.innerHTML = this.translate('TWENTY');

				ul2.appendChild(lquarter);
				ul2.appendChild(litwenty);

			var ul3 = document.createElement("ul");
			ul3.className = "ul3";

				var lto = document.createElement("li");
				lto.className = "lto";
				lto.innerHTML = this.translate('TO');

				var lpast = document.createElement("li");
				lpast.className = "lpast";
				lpast.innerHTML = this.translate('PAST');

				var lhalf = document.createElement("li");
				lhalf.className = "lhalf";
				lhalf.innerHTML = this.translate('HALF');

				ul3.appendChild(lto);
				ul3.appendChild(lpast);
				ul3.appendChild(lhalf);

			var ul4 = document.createElement("ul");
			ul4.className = "ul4";

				var li12 = document.createElement("li");
				li12.className = "li12";
				li12.innerHTML = this.translate('TWELVE');

				var li2 = document.createElement("li");
				li2.className = "li2";
				li2.innerHTML = this.translate('TWO');

				var li3 = document.createElement("li");
				li3.className = "li3";
				li3.innerHTML = this.translate('THREE');

				ul4.appendChild(li12);
				ul4.appendChild(li2);
				ul4.appendChild(li3);

			var ul5 = document.createElement("ul");
			ul5.className = "ul5";

				var li4 = document.createElement("li");
				li4.className = "li4";
				li4.innerHTML = this.translate('FOUR');

				var li5 = document.createElement("li");
				li5.className = "li5";
				li5.innerHTML = this.translate('FIVE');

				var li6 = document.createElement("li");
				li6.className = "li6";
				li6.innerHTML = this.translate('SIX');

				ul5.appendChild(li4);
				ul5.appendChild(li5);
				ul5.appendChild(li6);

			var ul6 = document.createElement("ul");
			ul6.className = "ul6";

				var li7 = document.createElement("li");
				li7.className = "li7";
				li7.innerHTML = this.translate('SEVEN');

				var li8 = document.createElement("li");
				li8.className = "li8";
				li8.innerHTML = this.translate('EIGHT');

				var li9 = document.createElement("li");
				li9.className = "li9";
				li9.innerHTML = this.translate('NINE');

				ul6.appendChild(li7);
				ul6.appendChild(li8);
				ul6.appendChild(li9);

			var ul7 = document.createElement("ul");
			ul7.className = "ul7";

				var li10 = document.createElement("li");
				li10.className = "li10";
				li10.innerHTML = this.translate('TEN');

				var li11 = document.createElement("li");
				li11.className = "li11";
				li11.innerHTML = this.translate('ELEVEN');

				var li1 = document.createElement("li");
				li1.className = "li1";
				li1.innerHTML = this.translate('ONE');

				var lioclock = document.createElement("li");
				lioclock.className = "liocklock";
				lioclock.innerHTML = this.translate('OCLOCK');

				ul7.appendChild(li10);
				ul7.appendChild(li11);
				ul7.appendChild(li1);
				ul7.appendChild(lioclock);

				if (timeMinute  >= 25 ) {
					nowplus = moment().add(1, 'h');
					timeHour = nowplus.format('h');
					eval("li" + timeHour).style.cssText = this.config.marked;
				}
				else {
					eval("li" + timeHour).style.cssText = this.config.marked;
			}
			if (timeMinute >= 0 && timeMinute < 5) {
				lioclock.style.cssText = this.config.marked;
			}
			else if (timeMinute >= 5 && timeMinute < 10) {
				lifive.style.cssText = this.config.marked;
				lpast.style.cssText = this.config.marked;
			}
			else if (timeMinute >= 10 && timeMinute < 15) {
				liten.style.cssText = this.config.marked;
				lpast.style.cssText = this.config.marked;
			}
			else if (timeMinute >= 15 && timeMinute < 20) {
				lquarter.style.cssText = this.config.marked;
				lpast.style.cssText = this.config.marked;
			}
			else if (timeMinute >= 20 && timeMinute < 25) {
				litwenty.style.cssText = this.config.marked;
				lpast.style.cssText = this.config.marked;
			}
			else if (timeMinute >= 25 && timeMinute < 30) {
				lifive.style.cssText = this.config.marked
				lto.style.cssText = this.config.marked;
				lhalf.style.cssText = this.config.marked;
			}
			else if (timeMinute >= 30 && timeMinute < 35) {
				lhalf.style.cssText = this.config.marked;
			}
			else if (timeMinute >= 35 && timeMinute < 40) {
				lifive.style.cssText = this.config.marked;
				lpast.style.cssText = this.config.marked;
				lhalf.style.cssText = this.config.marked;
			}
			else if (timeMinute >= 40 && timeMinute < 45) {
				litwenty.style.cssText = this.config.marked;
				lto.style.cssText = this.config.marked;
			}
			else if (timeMinute >= 45 && timeMinute < 50) {
				lquarter.style.cssText = this.config.marked;
				lto.style.cssText = this.config.marked;
			}
			else if (timeMinute >= 50 && timeMinute < 55) {
				liten.style.cssText = this.config.marked;
				lto.style.cssText = this.config.marked;
			}
			else if (timeMinute >= 55 && timeMinute < 60) {
				lifive.style.cssText = this.config.marked;
				lto.style.cssText = this.config.marked;
			}
			else {}

			wrapper.appendChild(ul1);
			wrapper.appendChild(ul2);
			wrapper.appendChild(ul3);
			wrapper.appendChild(ul4);
			wrapper.appendChild(ul5);
			wrapper.appendChild(ul6);
			wrapper.appendChild(ul7);
		}

			// Default English Layout
			else {
						var ul1 = document.createElement("ul");
						ul1.className = "ul1";

							var litis = document.createElement("li");
							litis.className = "litis";
							litis.style.cssText = this.config.marked;
							litis.innerHTML = this.translate('ITIS');

							var lhalf = document.createElement("li");
							lhalf.className = "lhalf";
							lhalf.innerHTML = this.translate('HALF');

							var liten = document.createElement("li");
							liten.className = "liten";
							liten.innerHTML = this.translate('TEN');

							ul1.appendChild(litis);
							ul1.appendChild(lhalf);
							ul1.appendChild(liten);

						var ul2 = document.createElement("ul");
						ul2.className = "ul2";

							var lquarter = document.createElement("li");
							lquarter.className = "lquarter";
							lquarter.innerHTML = this.translate('QUARTER');

							var litwenty = document.createElement("li");
							litwenty.className = "litwenty";
							litwenty.innerHTML = this.translate('TWENTY');

							ul2.appendChild(lquarter);
							ul2.appendChild(litwenty);

						var ul3 = document.createElement("ul");
						ul3.className = "ul3";

							var lifive = document.createElement("li");
							lifive.className = "lifive";
							lifive.innerHTML = this.translate('FIVE');

							var liminutes = document.createElement("li");
							liminutes.className = "liminutes";
							liminutes.innerHTML = this.translate('MINUTES');

							var lto = document.createElement("li");
							lto.className = "lto";
							lto.innerHTML = this.translate('TO');

							ul3.appendChild(lifive);
							ul3.appendChild(liminutes);
							ul3.appendChild(lto);

						var ul4 = document.createElement("ul");
						ul4.className = "ul4";

							var lpast = document.createElement("li");
							lpast.className = "lpast";
							lpast.innerHTML = this.translate('PAST');

							var li2 = document.createElement("li");
							li2.className = "li2";
							li2.innerHTML = this.translate('TWO');

							var li3 = document.createElement("li");
							li3.className = "li3";
							li3.innerHTML = this.translate('THREE');

							ul4.appendChild(lpast);
							ul4.appendChild(li2);
							ul4.appendChild(li3);

						var ul5 = document.createElement("ul");
						ul5.className = "ul5";

							var li1 = document.createElement("li");
							li1.className = "li1";
							li1.innerHTML = this.translate('ONE');

							var li4 = document.createElement("li");
							li4.className = "li4";
							li4.innerHTML = this.translate('FOUR');

							var li5 = document.createElement("li");
							li5.className = "li5";
							li5.innerHTML = this.translate('FIVE');

							ul5.appendChild(li1);
							ul5.appendChild(li4);
							ul5.appendChild(li5);

						var ul6 = document.createElement("ul");
						ul6.className = "ul6";

							var li6 = document.createElement("li");
							li6.className = "li6";
							li6.innerHTML = this.translate('SIX');

							var li7 = document.createElement("li");
							li7.className = "li7";
							li7.innerHTML = this.translate('SEVEN');

							var li8 = document.createElement("li");
							li8.className = "li8";
							li8.innerHTML = this.translate('EIGHT');

							ul6.appendChild(li6);
							ul6.appendChild(li7);
							ul6.appendChild(li8);

						var ul7 = document.createElement("ul");
						ul7.className = "ul7";

							var li9 = document.createElement("li");
							li9.className = "li9";
							li9.innerHTML = this.translate('NINE');

							var li10 = document.createElement("li");
							li10.className = "li10";
							li10.innerHTML = this.translate('TEN');

							var li11 = document.createElement("li");
							li11.className = "li11";
							li11.innerHTML = this.translate('ELEVEN');

							ul7.appendChild(li9);
							ul7.appendChild(li10);
							ul7.appendChild(li11);

						var ul8 = document.createElement("ul");
						ul8.className = "ul8";

							var li12 = document.createElement("li");
							li12.className = "li12";
							li12.innerHTML = this.translate('TWELVE');

							var lioclock = document.createElement("li");
							lioclock.className = "liocklock";
							lioclock.innerHTML = this.translate('OCLOCK');

							ul8.appendChild(li12);
							ul8.appendChild(lioclock);

							if (timeMinute  >= 25 ) {
								nowplus = moment().add(1, 'h');
								timeHour = nowplus.format('h');
								eval("li" + timeHour).style.cssText = this.config.marked;
							}
							else {
								eval("li" + timeHour).style.cssText = this.config.marked;
						}

						if (timeMinute >= 0 && timeMinute < 5) {
							lioclock.style.cssText = this.config.marked;
						}

						else if (timeMinute >= 5 && timeMinute < 10) {
							lifive.style.cssText = this.config.marked;
						  liminutes.style.cssText = this.config.marked;
							lpast.style.cssText = this.config.marked;
						}
						else if (timeMinute >= 10 && timeMinute < 15) {
							liten.style.cssText = this.config.marked;
							liminutes.style.cssText = this.config.marked;
							lpast.style.cssText = this.config.marked;
						}
						else if (timeMinute >= 15 && timeMinute < 20) {
							lquarter.style.cssText = this.config.marked;
							lpast.style.cssText = this.config.marked;
						}
						else if (timeMinute >= 20 && timeMinute < 25) {
							litwenty.style.cssText = this.config.marked;
							liminutes.style.cssText = this.config.marked;
							lpast.style.cssText = this.config.marked;
						}
						else if (timeMinute >= 25 && timeMinute < 30) {
							litwenty.style.cssText = this.config.marked;
							lifive.style.cssText = this.config.marked
							liminutes.style.cssText = this.config.marked;
							lpast.style.cssText = this.config.marked;
						}
						else if (timeMinute >= 30 && timeMinute < 35) {
							lhalf.style.cssText = this.config.marked;
						}
						else if (timeMinute >= 35 && timeMinute < 40) {
							litwenty.style.cssText = this.config.marked;
							lifive.style.cssText = this.config.marked;
							liminutes.style.cssText = this.config.marked;
							lto.style.cssText = this.config.marked;
						}
						else if (timeMinute >= 40 && timeMinute < 45) {
							litwenty.style.cssText = this.config.marked;
							liminutes.style.cssText = this.config.marked;
							lto.style.cssText = this.config.marked;
						}
						else if (timeMinute >= 45 && timeMinute < 50) {
							lquarter.style.cssText = this.config.marked;
							lto.style.cssText = this.config.marked;
						}
						else if (timeMinute >= 50 && timeMinute < 55) {
							liten.style.cssText = this.config.marked;
							liminutes.style.cssText = this.config.marked;
							lto.style.cssText = this.config.marked;
						}
						else if (timeMinute >= 55 && timeMinute < 60) {
							lifive.style.cssText = this.config.marked;
							liminutes.style.cssText = this.config.marked;
							lto.style.cssText = this.config.marked;
						}
						else {}

						wrapper.appendChild(ul1);
						wrapper.appendChild(ul2);
						wrapper.appendChild(ul3);
						wrapper.appendChild(ul4);
						wrapper.appendChild(ul5);
						wrapper.appendChild(ul6);
						wrapper.appendChild(ul7);
						wrapper.appendChild(ul8);
					}

			}

		else { wrapper.innerHTML = "something is wrong"; }


	return wrapper;
	}
});
