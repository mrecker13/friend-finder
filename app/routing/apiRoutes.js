var friendData = require("../data/friends");

module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        res.json(friendData);
    })

    app.post("/api/friends", function(req, res) {
        var newFriend = req.body;
        var newFriendScores = newFriend.scores;
        var bestMatchName = "";
        var bestMatchImg = "";
        var bestMatchDiff = 100;

        for(var i = 0; i < friendData.length; i++) {
            var difference = 0;
            for(var j=0; j < newFriendScores.length; j++) {
                difference += Math.abs(parseInt(friendData[i].scores[j]) - parseInt(newFriendScores[j]));
            }

            if (difference <= bestMatchDiff) {
                bestMatchDiff = difference;
                bestMatchName = friendData[i].name;
                bestMatchImg = friendData[i].photo;
                console.log("Best match diff: " + bestMatchDiff + ", best match name: " + bestMatchName + ", best photo: " + bestMatchImg);
            }
        }
        friendData.push(newFriend);
        res.json({name: bestMatchName, photo: bestMatchImg});
    })
}