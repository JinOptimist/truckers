$(document).ready(function(){
	var lines = [];
	var cityArray = ['Pinsk', 'Minsk', 'Moskwa', 'Kutno', 'Baza'];
	var countryArray = ['RUS', 'PL', 'BY', 'CZ'];
	
	var lineCount = 30;
	var lineInBox = 5;
	
	var editable = false;
	
	init();
	
	$('.toggleEditMode').click(function(){
		editable = !editable;
		drawLines();
	});
		
	function init(){
		initDrag();
		generateLines();
		drawLines();
	}
	
	function generateLines(){
		for(var i = 0; i < lineCount; i++){
			var line = generateLineObj();
			lines.push(line);
		}
	}
	
	function drawLines(){
		
		for(var i = 0; i < lineCount / lineInBox; i++){
			$('#sortable' + (1 + i)).empty();
		}
		
		for(var i = 0; i < lines.length; i++){
			var line = lines[i];
			
			var li = editable 
				? drawEditableLine(line)
				: drawLine(line);
			
			
			$('#sortable' + (1 + Math.floor(i / lineInBox))).append(li);
		}
	}
	
	function drawLine(line){
		var li = $('<li class="ui-state-default"></li>');
		
		var countryFrom = spanAndClass(line.CountryFrom);
		var cityFrom = spanAndClass('(' + line.CityFrom + ')');
		var countryTo = spanAndClass(line.CountryTo);
		var cityTo = spanAndClass('(' + line.CityTo + ')');
		var dateFrom = spanAndClass(line.DateFrom);
		var dateToDay = spanAndClass(line.DateToDay);
		var dateToMonth = spanAndClass(line.DateToMonth);
		
		li.append(countryFrom);
		li.append(cityFrom);
		li.append($("<span> => </span>"));
		li.append(countryTo);
		li.append(cityTo);
		li.append($("<span> </span>"));
		li.append(dateFrom);
		li.append($("<span> => </span>"));
		li.append(dateToDay);
		li.append($("<span>.</span>"));
		li.append(dateToMonth);
		
		return li;
	}
	
	function drawEditableLine(line){
		var li = $('<li class="ui-state-default"></li>');
		
		var countryFrom = selectAndOption(countryArray, line.CountryFrom);
		var cityFrom = selectAndOption(cityArray, line.CityFrom);
		var countryTo = selectAndOption(countryArray, line.CountryTo);
		var cityTo = selectAndOption(cityArray, line.CityTo);
		var dateFrom = inputNumberMinMax(line.DateFrom);
		var dateToDay = inputNumberMinMax(line.DateToDay);
		var dateToMonth = inputNumberMinMax(line.DateToMonth, 1, 12);
		
		li.append(countryFrom);
		li.append(cityFrom);
		li.append($("<span>=></span>"));
		li.append(countryTo);
		li.append(cityTo);
		li.append($("<span> </span>"));
		li.append(dateFrom);
		li.append($("<span>=></span>"));
		li.append(dateToDay);
		li.append($("<span>.</span>"));
		li.append(dateToMonth);
		
		return li;
	}
	
	function generateLineObj(){
		return {
			CountryFrom: randomFromArray(countryArray),
			CityFrom: randomFromArray(cityArray),
			CountryTo: randomFromArray(countryArray),
			CityTo: randomFromArray(cityArray),
			DateFrom: randomInt(1, 30),
			DateToDay: randomInt(1, 30),
			DateToMonth: randomInt(1,12),
		};
	}
	
	function spanAndClass(spanText, spanClass){
		var span = $('<span>');
		span.addClass(spanClass);
		if (Number.isInteger(spanText - 0) && spanText - 0 < 10){
			spanText = '0' + spanText;
		}
		span.text(spanText);
		
		return span;
	}
	
	function inputNumberMinMax(value, min, max){
		if (!min){
			min = 1;
		}
		if (!max){
			max = 30;
		}
		
		var input = $('<input type="number" />');
		input.val(value < 10 ? '0' + value : value);
		input.attr('min', min);
		input.attr('max', max);
		input.change(setTwoNumberDecimal);
		return input;
	}
	
	function selectAndOption(array, value){
		var selectTag = $('<select>');
		
		for(var i = 0; i < array.length; i++){
			var optionTag = $('<option>');
			var optionValue = array[i];
			optionTag.text(optionValue);
			if (optionValue == value){
				optionTag.attr('selected', 'selected');
			}
			selectTag.append(optionTag);
		}
		
		return selectTag;
	}
	
	function initDrag(){
		$("#sortable1, #sortable2, #sortable3, #sortable4, #sortable5, #sortable6")
			.sortable({
				connectWith: ".connectedSortable"
			})
			.disableSelection();
	}
	
	function randomInt(min, max){
		let rand = min + Math.random() * (max + 1 - min);
		return Math.floor(rand);
	}
	
	function randomFromArray(array){
		var index = randomInt(0, array.length - 1);
		return array[index];
	}

	function setTwoNumberDecimal(event) {
		if (this.value < 10){
			this.value = '0' + this.value;
		}
		
	}
});