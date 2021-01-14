// $(document).ready() makes sure that the javascript doesn't get run until the HTML is finished loading
// This is good for cases where the HTML is complex
// Explained in class activity 5.1 - 06-SandwichClick
$(document).ready(function() {
    
    // Functions
    function saveTimeBlockData() {
        var key = $(this).parent().attr('id');
        var value = $(this).siblings(".description").val(); // could also do: var value = $(this).prev().val();

        if (value === '') {
            localStorage.removeItem(key);
        } else {
            localStorage.setItem(key, value);
        }
    }

    function getTimeBlockHourById(timeBlockId) {
        var timeBlockHour;

        if (timeBlockId.includes('PM')) {
            timeBlockHour = parseInt(timeBlockId.replace('PM', ''));
            timeBlockHour = timeBlockHour < 12 ? timeBlockHour + 12 : timeBlockHour;
        } else {
            timeBlockHour = parseInt(timeBlockId.replace('AM', ''));
        }

        return timeBlockHour;
    }

    function clearTimeBlockStatus(timeBlock) {

        // clear the past, present, future designation
        timeBlock.classList.remove("past");
        timeBlock.classList.remove("present");
        timeBlock.classList.remove("future");
    }

    function setTimeBlockStatus(timeBlock) {
        // get timeblock hour and current hour
        let timeBlockId = timeBlock.getAttribute('id');
        let timeBlockHour = getTimeBlockHourById(timeBlockId);
        var currentHour = moment().hour() - 10;

        // Clear status before assigning new one
        clearTimeBlockStatus(timeBlock);

        // evaluate & assign timeblock status as past, present, or future
        if (timeBlockHour < currentHour) {
            timeBlock.classList.add("past");
        } else if (timeBlockHour === currentHour) {
            timeBlock.classList.add("present");
        } else {
            timeBlock.classList.add("future");
        }
    }

    function updateTimeBlockColors() {
        var timeBlocks = $('#day').children();

        // regular javascript for loop
        for (let i = 0; i < timeBlocks.length; i++) {
            setTimeBlockStatus(timeBlocks[i]);
        }
    }

    function updateTimeBlocksData() {

        // jquery loop thru each textarea element to assign values from localstorage
        $('.description').each(function() {
            var key = $(this).parent().attr('id');
            $(this).val(localStorage.getItem(key));
        });
    }

    function initializeTimeBlocks() {
        updateTimeBlockColors();
        updateTimeBlocksData();
    }

    // Event Listener for clicking the Save Button
    $('.saveBtn').click(saveTimeBlockData);

    // MOMENT.JS FORMATTING OPTIONS
    // moment().format();                                // "2019-08-12T17:52:17-05:00" (ISO 8601, no fractional seconds)
    // moment().format("dddd, MMMM Do YYYY, h:mm:ss a"); // "Monday, August 12th 2019, 5:52:00 pm"
    // moment().format("ddd, hA");                       // "Mon, 5PM"
    $('#currentDay').text(moment().format("dddd, MMMM Do, YYYY"));

    initializeTimeBlocks();

});
