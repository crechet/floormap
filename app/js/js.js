$(function() {
    // =====================================================================
    // Slider.
    var sliderRange = $("#slider-range");
    var squareRangeFrom = $("#squareRangeFrom");
    var squareRangeTo = $("#squareRangeTo");
    var square = "м²";

    sliderRange.slider({
        range: true,
        min: 0,
        max: 300,
        values: [40, 120],
        slide: function(event, ui) {
            // Set inputs depending on slider.
            squareRangeFrom.val(ui.values[0] + square);
            squareRangeTo.val(ui.values[1] + square);

            // Updating slider handles.
            leftHandle.attr('data-attr', ui.values[0] + square);
            rightHandle.attr('data-attr', ui.values[1] + square);
        }
    });

    // Set values from slider.
    squareRangeFrom.val( sliderRange.slider("values", 0) + square);
    squareRangeTo.val( sliderRange.slider("values", 1) + square);

    // Set slider handles info.
    var handles = sliderRange.find(".ui-slider-handle");
    var leftHandle = $(handles[0]);
    leftHandle.attr('data-attr', squareRangeFrom.val());
    var rightHandle = $(handles[1]);
    rightHandle.attr('data-attr', squareRangeTo.val());

    function cleanInput(value) {
        var replaceRegExp = /м|²|м²/g;
        var cleanValue = Number(value.replace(replaceRegExp, ''));
        if ($.isNumeric(cleanValue)) {
            return cleanValue;
        } else {
            return false;
        };
    }

    function fixInput(value) {
        var fixedValue = cleanInput(value);
        if (fixedValue) {
            return fixedValue + square;
        }
    }

    function squareRangeFromChanged() {
        var newVal = cleanInput(this.value);
        var otherInputVal = cleanInput(squareRangeTo.val());
        if (newVal && otherInputVal && newVal <= otherInputVal) {
            // Move slider.
            sliderRange.slider("option", "values", [newVal, sliderRange.slider("values", 1)]);
            // Fix current value.
            this.value = fixInput(this.value);
            leftHandle.attr('data-attr', this.value);
        }
    }

    function squareRangeToChanged() {
        var newVal = cleanInput(this.value);
        var otherInputVal = cleanInput(squareRangeFrom.val());
        if (newVal && otherInputVal && newVal >= otherInputVal) {
            // Move slider.
            sliderRange.slider("option", "values", [sliderRange.slider("values", 0), newVal]);
            // Fix current value.
            this.value = fixInput(this.value);
            rightHandle.attr('data-attr', this.value);
        }
    }

    // Set slider values.
    squareRangeFrom.change(squareRangeFromChanged);
    squareRangeTo.change(squareRangeToChanged);

    // =====================================================================
    // Init phone input mask.
    Inputmask().mask(document.querySelectorAll("input"));

    // =====================================================================
    // Show / hide callback form
    var showCallback = $("#callback");
    var veil = $("#veil");
    var callbackForm = $("#contact-form");
    var closeContactForm = $("#close-contact-form");

    showCallback.click(function() {
      veil.removeClass("hidden");
      callbackForm.removeClass("hidden");
    });

    closeContactForm.click(function() {
      veil.addClass("hidden");
      callbackForm.addClass("hidden");
    });

    // =====================================================================
    // Flat filter demo.
    var flatTypeSelectors = $(".flatType");
    var oneRoomFlatSelector = $("#flatType2");
    // Flat svg main group.
    var flatMap = $("#flats");
    var allFlats = $(".flat-container");
    var flatsToHide = null;

    flatTypeSelectors.click(function() {
        var currentFlatSelectorId = this.id;
        if (currentFlatSelectorId) {
            showFlatsByType(currentFlatSelectorId);
        } else {
            showAllFlats();
        }
    });

    function showFlatsByType(type) {
        showAllFlats();
        var type = '.' + type;
        var flatsToShow = flatMap.find(type);
        flatsToHide = flatMap.find("g.flat-container").not(type);
        flatsToHide.each(function(i, value) {
            $(value).addClass("disabled-flat");
        });
    }

    function showAllFlats() {
        if (allFlats) {
            allFlats.each(function(i, value) {
                $(value).removeClass("disabled-flat");
            });
        }
    }
});