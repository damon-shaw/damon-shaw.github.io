var ColliderTool = function() {

    this.areColliding = function(obj1, obj2) {
        var o1Bounds = obj1.getBounds();
        var o2Bounds = obj2.getBounds();

        if(o1Bounds.yMin < o2Bounds.yMax && o1Bounds.yMax > o2Bounds.yMin) {
            if(o1Bounds.xMin < o2Bounds.xMax && o1Bounds.xMax > o2Bounds.xMin) {
                return true;
            }
        }

        return false;
    };

    this.willFirstCollide = function(obj1, obj2) {
        var o1Bounds = obj1.getNextMoveBounds();
        var o2Bounds = obj2.getBounds();

        if(o1Bounds.yMin < o2Bounds.yMax && o1Bounds.yMax > o2Bounds.yMin) {
            if(o1Bounds.xMin < o2Bounds.xMax && o1Bounds.xMax > o2Bounds.xMin) {
                return true;
            }
        }

        return false;
    };

    this.willFirstCollideBottomside = function(obj1, obj2, keypresses) {
        var o1Bounds = obj1.getNextMoveBounds(keypresses);
        var o2Bounds = obj2.getBounds();

        if(o1Bounds.yMin < o2Bounds.yMax && o1Bounds.yMax > o2Bounds.yMin && o1Bounds.yMin < o2Bounds.yMin) {
            if(o1Bounds.xMin < o2Bounds.xMax && o1Bounds.xMax > o2Bounds.xMin) {
                return true;
            }
        }

        return false;
    };

    this.willFirstCollideTopside = function(obj1, obj2, keypresses) {
        var o1Bounds = obj1.getNextMoveBounds(keypresses);
        var o2Bounds = obj2.getBounds();

        if(o1Bounds.yMin < o2Bounds.yMax && o1Bounds.yMax > o2Bounds.yMin && o1Bounds.yMax > o2Bounds.yMax) {
            if(o1Bounds.xMin < o2Bounds.xMax && o1Bounds.xMax > o2Bounds.xMin) {
                return true;
            }
        }

        return false;
    };

    this.willFirstCollideSide = function(obj1, obj2, keypresses) {
        var o1Bounds = obj1.getNextMoveBounds(keypresses);
        var o2Bounds = obj2.getBounds();

        if(o1Bounds.yMin < o2Bounds.yMax && o1Bounds.yMax > o2Bounds.yMin) {
            if(o1Bounds.xMin < o2Bounds.xMax && o1Bounds.xMax > o2Bounds.xMin && o1Bounds.xMin < o2Bounds.xMin) {
                return true;
            }

            if(o1Bounds.xMin < o2Bounds.xMax && o1Bounds.xMax > o2Bounds.xMin && o1Bounds.xMax > o2Bounds.xMax) {
                return true;
            }
        }

        return false;
    };

    this.willSecondCollide = function(obj1, obj2) {

    };

    this.willCollide = function(obj1, obj2) {
        var o1Bounds = obj1.getNextMoveBounds();
        var o2Bounds = obj2.getNextMoveBounds();

        if(o1Bounds.yMin < o2Bounds.yMax && o1Bounds.yMax > o2Bounds.yMin) {
            if(o1Bounds.xMin < o2Bounds.xMax && o1Bounds.xMax > o2Bounds.xMin) {
                return true;
            }
        }

        return false;
    };

};