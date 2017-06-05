/**
 * PageCalculator library
 * @author Yuri Gorenburgov
 * @version 1.0.1
 *
 * @description This library provides PageCalculator class made for Genestock tesk task
 */



/** @example
 * var calculator = new PageCalculator(['a','b','c','d','e','f'], 4);

 calculator.getTotalItems(); // should === 6

 calculator.getTotalPages(); // should === 2

 calculator.getItemsOnPage(0); // should === 4

 calculator.getItemsOnPage(1); // last page ­ should === 2

 calculator.getItemsOnPage(2); // should === ­1 since the page is invalid

 calculator.getPageIndexByItem(5); // should === 1 (zero based index)

 calculator.getPageIndexByItem(2); // should === 0

 calculator.getPageIndexByItem(20); // should === ­1

 calculator.getPageIndexByItem(­10); // should === ­1
 */

/**
 * Create PageCalculatorExceptionClass
 *
 * @constructor
 * @this {PageCalcuulatorException}
 * @param {string} message -  exception message
 */

function PageCalculatorException(message) {
    this.message = message;
    this.name = "Page calculator exception";
    this.toString = function() {
        return this.name + ': ' + this.message;
    };
}

/**
 *
 * @constructor
 * @this {PageCalculator}
 * @param {Array} collection - the collection of pages
 * @param {number} [itemsPerPage = 0] - max items on page, in case of 0 (Default) all items considered belong to single page
 *
 */

function PageCalculator (collection, itemsPerPage) {
    var DEFAULT_ITEMS_PER_PAGE = 0; //The 0 will be interpreted as no need for pagination and all items belongs to single page number 0;
    if (!collection || !(collection instanceof Array)) {
        throw new PageCalculatorException('No page collection passed to constructor!');
    }

    this.collection = collection;

    if (itemsPerPage && typeof (itemsPerPage) != 'number') {
        throw new PageCalculatorException('itemsPerPage param must be a number!');
    }

    if (!isInteger(itemsPerPage)) {
        throw new PageCalculatorException('itemsPerPage param must be an integer number!');
    }

    if (itemsPerPage < 0) {
        throw new PageCalculatorException('itemsPerPage param must be an integer number!');
    }

    this.itemsPerPage = itemsPerPage || DEFAULT_ITEMS_PER_PAGE;

    function isInteger(x) {
        return x % 1 === 0;
    }

}

/**
 *  @return {Number}
 */
PageCalculator.prototype.getTotalItems = function() {
    return this.collection.length;
}

/**
 * @return {number}
 */
PageCalculator.prototype.getTotalPages = function() {
    if (this.itemsPerPage === 0) {
        return 1;
    } else {
        return Math.ceil(this.collection.length / this.itemsPerPage);
    }
}

/**
 *
 * @param {number} pageNumber
 * @return {number}
 */
PageCalculator.prototype.getItemsOnPage = function(pageNumber) {
    var pageCount = this.getTotalPages();
    if (pageNumber > pageCount - 1) {
        return -1;
    }
    if (this.itemsPerPage === 0) {
        return this.collection.length;
    } else if (pageNumber === pageCount - 1) {
        return this.collection.length % this.itemsPerPage || this.itemsPerPage;
    } else {
        return this.itemsPerPage;
    }
}

/**
 *
 * @param {*} itemIndex
 * @return {number}
 *
 */
PageCalculator.prototype.getPageIndexByItem = function(itemIndex) {

    if (itemIndex < 0 || itemIndex > this.getTotalItems() - 1) {
        return -1;
    };
    return this.itemsPerPage === 0 ? 1 : Math.floor(itemIndex/this.itemsPerPage);
}
