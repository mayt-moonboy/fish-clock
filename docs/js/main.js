$(function () {
    let now = moment();
    let timestamp = now.format("dddd, MMMM Do YYYY, h:mm:ss a");
    let month = now.format("M");
    let time = now.format("h a");
    let hour = now.format("kk");

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function toNumberArray(string) {
        if (string.toLowerCase().includes("all day")) return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
        let result = string.split("-")
            .map(time => {
                if (time.includes("pm"))
                    return parseInt(time.replace("pm", "")) + 12;
                else
                    return parseInt(time.replace("am", ""));
            });
        let start = result[0];
        let end = result[1];
        let all = [start];
        let curr = start;
        while (curr <= 24 && curr !== end) {
            if (curr === 24) curr = 1;
            else curr++;
            all.push(curr);
        }
        return all;
    }

    $("#welcome").replaceWith("<span>Welcome to Animal Clocking: New Horizons! It is currently " + timestamp + ".</span>");
    let monthMap = {
        1: "Jan",
        2: "Feb",
        3: "Mar",
        4: "Apr",
        5: "May",
        6: "Jun",
        7: "Ju",
        8: "Aug",
        9: "Sep",
        10: "Oct",
        11: "Nov",
        12: "Dec"
    };

    fish
        .filter(fish => fish.northern.includes(parseInt(month)))
        .filter(fish => toNumberArray(fish.time).includes(parseInt(hour)))
        .map(fish => {
            let northern = fish.northern;
            let size = fish.northern.length - 1;
            if (size === 0)
                fish.available = monthMap[northern[0]];
            else if (size === 11)
                fish.available = "All Year";
            else
                fish.available = monthMap[northern[0]] + " - " + monthMap[northern[size]];
            return fish;
        })
        .forEach(fish => $('#fish-table').append(
            "<tr class='bg-warning'>" +
            "<th><img src=" + fish.image + "></th>" +
            "<td>" + fish.name + "</td>" +
            "<td>" + fish.shadow + "</td>" +
            "<td>" + fish.rarity + "</td>" +
            "<td>" + fish.available + "</td>" +
            "<td>" + fish.location + "</td>" +
            "<td>" + fish.time + "</td>" +
            "<td>" + numberWithCommas(fish.price) + " bells</td>" +
            "</tr>"
        ));
});