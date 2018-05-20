$( document ).ready(function() {
//навигация	
function switchFieldset (blockHide, blockShow) {
	$('fieldset.' + blockHide).css('display', 'none');
	$('.nav .active').toggleClass('active');			
	$('.nav #' + blockShow).toggleClass('active');
	$('fieldset.' + blockShow).css('display', 'block');
}

$('.nav-item').click( function () {
	var blockHide = $('.nav .active').attr('id');
	switchFieldset(blockHide, this.id);
});

$('button.next').click(function() {
	var blockHide = $(this).parent().attr('data-fieldName');
	var blockShow = $(this).parent().next().attr('data-fieldName');
	switchFieldset(blockHide, blockShow);
});

$('button.prev').click(function() {
	var blockHide = $(this).parent().attr('data-fieldName');
	var blockShow = $(this).parent().prev().attr('data-fieldName');
	switchFieldset(blockHide, blockShow);
});
//превью фото
function readURL(input) {
	if (input.files && input.files[0]) {
			var reader = new FileReader();            
			reader.onload = function (e) {	
				$('#image').attr('src', e.target.result);
			}            
		reader.readAsDataURL(input.files[0]);
	}
}    
$("#imgInput").change(function(){
	readURL(this);
});
//"размножение" и заполнение ингредиентов 
	var ul = document.querySelector('ul.ingredients-list');
	var ingredient =  document.querySelector('li.ingredients-item')
for (var i =2; i < 8; i++){
	var clone = ingredient.cloneNode(true);
	  clone.querySelector('select.ingredient-name').setAttribute('name','ingredient-' + i);
	  clone.querySelector('input[type="number"]').setAttribute('name','count-' + i);
	  clone.querySelector('select.ingredient-volume').setAttribute('name','volume-' + i);
	  clone.querySelector('input[type="checkbox"]').setAttribute('name','decor-' + i);
	ul.appendChild(clone);
}	
var ingredients = {
	"Безалкогольные напитки": [
		{name:"вода"},
		{name:"сок"},
		{name:"молоко"}
	],
	"Алкогольные напитки": [
		{name:"водка"},
		{name:"пиво"},
		{name:"вино"},
		{name:"текила"},
		{name:"коньяк"}
	]
};
	var ingredientSelect = document.querySelectorAll("select[name^=ingredient]");
		
for (var i = 0; i < ingredientSelect.length; i++){			
	for (var key in ingredients) {
		var optGroup = document.createElement("OPTGROUP");
		optGroup.label = key;
		ingredientSelect[i].appendChild(optGroup);
		 var items = ingredients[key];
			 for (var key in items) {
				 var option = new Option(items[key].name, items[key].name);				 
				 optGroup.appendChild(option);
			 }
	}
}

var volums = ["мл", "гр", "кг", "стакан"];
var ingredientSelect = document.querySelectorAll("select[name^=volume]");
		for (var i = 0; i < ingredientSelect.length; i++){
		 for (var j = 0; j < volums.length; j++) {
			ingredientSelect[i].options[j] = new Option(volums[j], volums[j]);
		 }
		}
//стилизация input и select	
$(function() {
	$('select').each(function(){
		$(this).styler({
			selectPlaceholder: $(this).find('option:first-of-type').attr('label'),
			singleSelectzIndex: '1000'
		});
	});
});
$(function() {
	$('input[type=number]').styler();
});
		
//чтобы не прописывать каждой картинке и alt и data-hint, заполняю data-hint из alt img
	$(".hint").each(function(){
		if ($(this).attr("data-hint") == null) {
			var hint = $(this).find('img').attr('alt');
			var arr = hint.split(" ");
				arr.splice(1,0,"\n");
				hint = arr.join(" ");
			$(this).attr("data-hint", hint);
		}
	});
//выбор стакана при табуляции
$('.glass').focus(function () {
	$(this).find('input[type="radio"]').prop('checked', 'checked');	
});


	/* Placeholder for IE from habrahabr, немного исправлен для textarea*/
	if(document.all && !window.atob){ 
		$("form").find('input[type="text"], textarea').each(function() {
			var val = $(this).attr("placeholder");
			$(this).val(val);
			$(this).css('color','#ccc');
		}).focusin(function() {
			var val = $(this).attr('placeholder');
			if($(this).val() == val) {
				$(this).val('').css('color','#6b6b6b');
			}
		}).focusout(function() {
			var val = $(this).attr('placeholder');
			if($(this).val() == "") {
				$(this).val(val).css('color','#ccc');
			}
		});

		/* Protected send form */
		$("form").submit(function() {
			$(this).find('input[type="text"], textarea').each(function() {
				var val = $(this).attr('placeholder');
				if($(this).val() == val) {
					$(this).val('');
				}
			})
		});
	}

});
