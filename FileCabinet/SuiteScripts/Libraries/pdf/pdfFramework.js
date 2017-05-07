/**
 * Copyright NetSuite, Inc. 2011 All rights reserved.
 * For NetSuite SC Solution Center's internal use only.
 * Not for distribution outside of NetSuite.
 *
 * @fileOverview PDF Report Prototyping Library
 *
 * The objective of this library is quick prototyping of reports.
 * It is not intended for production use.
 *
 * The NetSuite SC Solution Center does not guarantee the performance
 * nor correctness of this library and is not obligated to fix any
 * defect nor provide any support and/or documentation.
 *
 * Functions as of this date are not yet stable nor optimized.
 * Implementation is changing between different projects.
 *
 * @author <a href="ali@netsuite.com">August Li</a>
 * @version 1.00 Version
 */

var ns = ns || {};

/* Formatter */

/**
 * @namespace Formatter object. Handles formatting of various types.
 * Singleton.
 * @typedef {Object}
 */
ns.formatter = {
    _fontsize : { 1:8, 2:10, 3:12, 4:14, 5:18, 6:24, 7:36 },
    _fontface: {
        'Courier New':'Courier',
        'Times New Roman':'Times',
        'Arial':'Helvetica',
        'Comic Sans MS':'Helvetica',
        'Georgia':'Times',
        'Tahoma':'Helvetica',
        'Trebuchet MS':'Helvetica',
        'Verdana':'Helvetica'
    },

    /**
     * @function
     * @see ns.currency
     */
    currency : ns.currency,

    /**
     * @function
     * @see ns.usd
     */
    usd : ns.usd,

    /**
     * @function
     * @see ns.euro
     */
    euro : ns.euro,

    /**
     * @function
     * @see ns.gbp
     */
    gbp : ns.gbp,

    /**
     * @function
     * @see ns.yen
     */
    yen : ns.yen,

    /**
     * @function
     * @see ns.decimal
     */
    decimal : ns.decimal,

    /**
     * @function
     * @see ns.integer
     */
    integer : ns.integer,

    /**
     * @function
     * @see ns.currencyZero
     */
    currencyZero : ns.currencyZero,

    /**
     * @function
     * @see ns.usdZero
     */
    usdZero : ns.usdZero,

    /**
     * @function
     * @see ns.euroZero
     */
    euroZero : ns.euroZero,

    /**
     * @function
     * @see ns.gbpZero
     */
    gbpZero : ns.gbpZero,

    /**
     * @function
     * @see ns.yenZero
     */
    yenZero : ns.yenZero,

    /**
     * @function
     * @see ns.decimalZero
     */
    decimalZero : ns.decimalZero,

    /**
     * @function
     * @see ns.integerZero
     */
    integerZero : ns.integerZero,

    /**
     * @function
     * @see ns.split
     */
    split : ns.split,

    /**
     * Return date formatted according to context date format settings.
     * @see ns.date
     */
    date : function(dateToFormat, formatString, isZeroPad) {
        return ns.date(dateToFormat, (formatString==null) ? ns.context.get('formatDate') : formatString, (isZeroPad==null) ? ns.context.get('zeroPadding') : isZeroPad);
    },

    /**
     * @function
     * @see ns.nsDate
     */
    nsDate : function(dateToFormat, formatString) {
        return ns.nsDate(dateToFormat, (formatString==null) ? ns.context.get('formatDate') : formatString);
    },

    /**
     * @function
     * @see ns.stringToXml
     */
    stringToXml : ns.stringToXml,

    /**
     * @function
     * @see ns.yn
     */
    yn : ns.yn,

    /**
     * @function
     * @see ns.yesNo
     */
    yesNo : ns.yesNo,

    /**
     * @function
     * @see ns.trueFalse
     */
    trueFalse : ns.trueFalse,

    /**
     * @function
     * @see ns.singleLine
     */
    singleLine : ns.singleLine,

    /**
     * @function
     * @see ns.titleCase
     */
    titleCase : ns.titleCase,

    /**
     * Return as upper case.
     * @param {string} text Text to change
     * @return {string} Text in upper case
     */
    upperCase : function(text) {
        if (ns.isNotEmpty(text)) {
            text = text.toUpperCase();
        }
        return text;
    },

    /**
     * Return as lower case.
     * @param {string} text Text to change
     * @return {string} Text in lower case
     */
    lowerCase : function(text) {
        if (ns.isNotEmpty(text)) {
            text = text.toLowerCase();
        }
        return text;
    },

    /**
     * Handle \u0003 character in Item Matrix Options.
     * @param {string} Text
     * @return {string} Formatted text
     */
    itemOptions : function(text) {
        if (text.indexOf(ns._itemMatrixOptionSeparator)) {
            var opts = text.split(ns._itemMatrixOptionsSeparator), txt = '';
            for ( var a = 0; a < opts.length; a++) {
                if (a > 0) {
                    txt += '\n';
                }
                var s = opts[a].split(ns._itemMatrixOptionSeparator);
                txt += s[2] + ': ' + s[4];
            }
            return txt;
        } else {
            return text;
        }
    },

    /**
     * @function
     * @see ns.noParent
     */
    noParent : ns.noParent,

    /**
     * @function
     * @see ns.trim
     */
    trim : ns.trim,

    /**
     * @function
     * @see ns.ltrim
     */
    ltrim : ns.ltrim,

    /**
     * @function
     * @see ns.rtrim
     */
    rtrim : ns.rtrim,

    /**
     * Return an IMG HTML tag.
     * @this {Object}
     * @param {string} value Image URL (from saved search) or file id
     * @param {number} dpi Can be used to scale the image. (This attribute is specific to PDF, otherwise a normal HTML IMG tag is returned)
     * @param {string} align Alignment (e.g 'center')
     * @param {string} border Border size. Default is '0'.
     * @return {string} IMG HTML tag for this image.
     */
    image :  function(value, dpi, align, border) {
        if (ns.isEmpty(value)) {
            return value;
        } else {
            if (!isNaN(value)) { //if number = file id
                value = nlapiLoadFile(value).getURL();
            }
            //check if already image HTML tag (from ns.context._getCompany)
            if (value.indexOf('<img src="')==0) {
                //get image src value
                var p = 10;
                value = value.substring(p,value.indexOf('"',p+1));
            } else {

                if (value.indexOf(ns._website)!=0) {
                    value = ns._website + value;
                }
                value = nlapiEscapeXML(value);
            }
            return ['<img src="', value, '" ' ,
                   (ns.isAssigned(dpi) ? ' dpi="' + dpi + '" ' : '') ,
                   (ns.isAssigned(align) ? ' align="' + align +'" ' : '') ,
                   'border="', (ns.isAssigned(border) ? border : '0') ,'" />'].join('');
        }
    },

    /**
     * Replace HTML tags with XML compliant tags.
     * Handles HTML created with the memo field, but may not handle custom HTML correctly.
     * @param {Object} htmlText HTML to escape
     * @param {boolean=} isMemo Whether this is content from a memo field.
     * @return {string|null|Object} Proper HTML for XML
     */
    htmlToXml : function(htmlText, isMemo) {
        if (ns.isEmpty(htmlText) || typeof htmlText!='string') {
            return htmlText;
        } else {
            var html = (isMemo===true) ? '<span style="font-family: Helvetica;font-size:10pt;">'+htmlText+'</span>' : htmlText,
            fontstack = [], spanstack = [],
            flag = 0;
            html = html.replace(/&nbsp;/ig,'&#160;').replace(/<(.+?)>/ig, function(match) {
                if (match=='<br>') {
                    return '<br/>';
                } else if (match.indexOf('<font ')==0) {
                    var value = match.substring(match.indexOf('"')+1,match.lastIndexOf('"'));
                    var css = null;
                    if (match.indexOf('<font size')==0) {
                        css = 'font-size:'+ns.formatter._fontsize[value]+'pt;';
                    } else if (match.indexOf('<font size')==0) {
                        css = 'color:'+value+';';
                    //} else if (match.indexOf('<font face')==0) {
                    //    css = 'font-family:'+value+';';
                    }
                    fontstack.push(css);
                    flag++;
                    return ((flag>1) ? '</span>' : '') + '<span style="' + spanstack.join('') + fontstack.join('') + '">';
                } else if (match=='</font>') {
                    fontstack.pop();
                    flag--;
                    return '</span>' + ((flag>0) ?  '<span style="' + spanstack.join('') + fontstack.join('') + '">' : '');
                } else if (match.indexOf('<span ')==0) {
                    var css = match.substring(match.indexOf('"')+1,match.lastIndexOf('"'));
                    if (css.indexOf('font-family: ')==0) {
                        var fnt = ns.formatter._fontface[css.substring(13,css.length-1)];
                        css = 'font-family:'+((fnt)?fnt:'Helvetica')+';';
                    }
                    spanstack.push(css);
                    flag++;
                    return ((flag>1) ? '</span>' : '') + '<span style="' + spanstack.join('') + fontstack.join('') + '">';
                } else if (match=='</span>') {
                    spanstack.pop();
                    flag--;
                    return '</span>' + ((flag>0) ?  '<span style="' + spanstack.join('') + fontstack.join('') + '">' : '');
                } else {
                    return match;
                }
            });
            return html;
        }
    },

    /**
     * Replace HTML tags with XML compliant tags.
     * Handles HTML created with the memo field, but may not handle custom HTML correctly.
     * @param {Object} htmlText HTML to escape
     * @return {string} Proper HTML for XML
     */
    htmlMemoToXml : function(htmlText) {
        ns.formatter.htmlToXml(htmlText, true);
    },

    /**
     * Return empty square checkbox if false and shaded square checkbox if true.
     *
     * @param {string} value Checkbox character
     * @return {string} Square checkbox or shaded square checkbox
     */
    checkbox : function(value) {
        return '<span style="font-family: ZapfDingbats;">'+(ns.isTrue(value)?'&#x25A0;':'&#x2751;')+'</span>';
    },

    /**
     * Create barcode. PDF specific tag command.
     * @param {number|string} value Value for barcode
     * @param {number} rotate  Angle of rotation. Optional.
     * @param {boolean} showText Whether to display a text label
     * @param {string} type  Barcode type. Defaults to context "barcode" setting.
     * @return {string} Barcode tag
     */
    barcode : function(value, rotate, showText, type) {
        if (ns.isNotAssigned(type)) {
            type = ns.context.get('barcode');
        }
        if (ns.isNotAssigned(showText)) {
            showText = false;
        }
        return ["<barcode codetype='",type,"' ", (ns.isNotAssigned(rotate)?'':"rotate='"+rotate+"' ") , "showtext='",showText,"' value='" , value , "'/>"].join('');
    },
    
    /**
     * Return default formatter function based on column type. 
     * Note that some integers are returned as float when using formulas.
     * Also see ns._getDefaultFormatter
     * @this {Object}
     * @param {string} colType NetSuite column type (from saved search)
     * @param {string} colName Column name (only used to determine integer from float)
     * @return {function(string):string|function(number):string|function(Date):string|null} Formatter function
     */
    _getDefaultFormatter : function(colType, colName) {
        if (colType == 'currency' || colType == 'currency2') {
            return ns.formatter.currency;
        } else if (colType == 'checkbox') {
            return ns.formatter.yesNo;
        } else if (colType == 'integer') {
            return ns.formatter.integer;
        } else if (colType == 'date') {
            return ns.formatter.nsDate;
        } else if (colType == 'float') {
            var isInteger = false;
            if (colName != undefined) {
                isInteger = ns._integerFields[colName];
            }
            return (isInteger) ? ns.formatter.integer : ns.formatter.decimal;
        } else {
            return null;
        }
    },    
};

/**
 * @namespace Context is used for replacing {token} with its value.
 * To escape { and } use &amp;#123; and &amp;#125; respectively.
 * <br/>
 * <pre>
 * ns.context.get('{rec.entity}');                    //to get value of token (not XML escaped)
 * ns.context.getXml('{rec.entity}');                 //to get value of token (XML escaped)
 * ns.context.replace('Customer is {rec.entity}');    //for use with embedded text (not XML escaped)
 * ns.context.replaceXml('Customer is {rec.entity}');    //for use with embedded text (XML escaped)
 * </pre>
 * <br/>
 * <b>For HTML shortcuts:</b>
 * <pre>{s}Hello{/s}             //&lt;span&gt;Hello&lt;/span&gt;
 * {s.cssName}Hello{/s}     //&lt;span class="cssName"&gt;Hello&lt;/span&gt;
 * {s=font: bold 12pt Helvetica}Hello{/s} //&lt;span style="font: bold 12pt Helvetica"&gt;Hello&lt;/span&gt;
 * {d.cssName}Hello{/d}     //&lt;div class="cssName"&gt;Hello&lt;/div&gt;
 * {p.cssName}Hello{/p}     //&lt;p class="cssName"&gt;Hello&lt;/p&gt;
 * {img.1234}               //where 1234 is file id in file cabinet
 * {img.1234,120}           //where 1234 is file id in file cabinet, 120 is dpi
 *                          //there are four parameters (parameters corresponds to ns.formatter.image)
 * </pre>
 * <b>For date and time:</b>
 * <pre>ns.context.set("gmt", "+0"); //Optional, set to London time
 *                 //Default will use company timezone
 * ns.context.set("formatDate", "MM-DD-YYYY");
 *                 //Default, see ns.formatter.date for format symbols
 * ns.context.set("formatDateTime", "MM-DD-YYYY HH:mmam");
 *                 //Default, see ns.formatter.date for format symbols
 * ns.context.set("zeroPadding", true); //turn on zero padding for date and time
 *
 * //date time is cached for these functions, so basically for multiple calls, they return the date/time of the first call
 * //this is to make date and time consistent throughout a report
 * {date}                         //default date format
 * {datetime}                     //default date time format
 * {date.MM/DD/YYYY}              //custom date format
 * {date.DD MONTH, YYYY HH:mm AM} //custom date time format
 * </pre>
 *
 * <b>For records:</b> (Supports formatter function)
 * <pre>ns.context.set("recId",recId).set("recType",recType); //Required
 *
 * {rec.&lt;field&gt;}
 * {rec.&lt;field&gt;.&lt;sub field&gt;}
 * {rec.&lt;field&gt;#&lt;field record type&gt;.&lt;sub field&gt;}
 * {rec.&lt;field&gt;,functionName}     //where functionName is a function in formatter
 * {rec.&lt;field&gt;,nsDate("DD MONTH, YYYY")} //uses ns.formatter.nsDate(value,"DD Month, YYYY")
 *                                        //omit the first parameter which is automatically the field value
 *                                        //starting parameter is actually the second parameter to the function.
 * To get value instead of text, add '@' before rec.
 * {@rec.&lt;field&gt;}
 * </pre>
 *
 * <b>For company:</b> (Supports formatter function)
 * <pre>ns.context.set("dpiLogo", 200); //Optional, for setting image DPI for company logos
 *                              //Increasing dpi will make logo smaller.
 *
 * {com.&lt;company information fieldname&gt;}
 * {com.formlogo,image(100)} //where image is ns.formatter.image and 100 is the second parameter (dpi)
 * </pre>
 *
 * <b>For custom functions:</b>
 * <pre>{func.&lt;custom function&gt;}      //Function must return string value or HTML
 *                                Can be used for nested TableWiki by referencing a function that returns a TableWiki
 *                                as HTML (TableWiki.getHTML) inside another TableWiki with this call.
 * </pre>
 *
 * <b>For user defined tokens:</b> (Supports formatter function)
 * <pre>ns.context.set("{mytoken}", 3100);
 * {mytoken,usdZero} //displays "$3,100.00" using ns.formatter.usdZero
 * </pre>
 *
 * <b>For file id mapping:</b> (For bundling, when file ids used are different, you can pass a map to translate the file ids)
 * <pre>var map = { 1234 : 5678, 9012 : 3456 };
 * ns.context.set("fileIdMap", map); //where map is a JavaScript Object,
 * </pre>
 * @typedef {Object}
 */
ns.context = {
     _today : null, //cached today's date and time to be consistent throughout report
    _formatterSeparator : ',',
    _context: {
        "barcode": "code128",
        "zeroPadding": false,
        "formatDate": "MM-DD-YYYY",
        "formatTime": "HH:mmam",
        "formatDateTime": "MM-DD-YYYY HH:mmam"
    },
    _timeFormats: {
       'fmHH:fmMI am':  'HH:mm AM',
       'fmHH24:fmMI':  'HH24:mm',
       'fmHH-fmMI am': 'HH-mm AM',
       'fmHH24-fmMI': 'HH24-mm'
    },
    _lookup: {},

    _getToken: function(token) {
        return token.substring(token.indexOf(ns._fieldSeparator)+1, token.length-1);
    },

    /**
     * Return the cached value of today's date so that the report will have a consistent date and time through out.
     * Subsequent calls will return the same value.
     *
     * @param {string} gmt GMT string, optional. e.g. '+8'.
     * @return {Date} Today's date.
     */
    getCachedToday : function(gmt) {
        if (this._today == null) {
            this._today = ns.getToday(gmt);
        }
        return this._today;
    },

    _getDateTime: function(ctx) {
        return ns.formatter.date(this.getCachedToday(ctx['gmt']),ctx["formatDateTime"],ctx['zeroPadding']);
    },

    _getDate: function(token, ctx) {
        return ns.formatter.date(this.getCachedToday(ctx['gmt']), (token.indexOf(ns._fieldSeparator)==-1) ? ctx["formatDate"] : token.substring(6, token.length-1),ctx['zeroPadding']);
    },

    _getImage: function(token, ctx) {
        var params = token.substring(5, token.length-1).split(','), len = params.length;
        if (!isNaN(params[0])) { //if file id
            var map = ctx['fileIdMap'];
            if (map) {
                var id = map[params[0]];
                if (id) {
                    params[0] = id;
                }
            }
        }
        if (len == 1) {
            return ns.formatter.image(params[0]);
        } else if (len == 2) {
            return ns.formatter.image(params[0],params[1]);
        } else if (len == 3) {
            return ns.formatter.image(params[0],params[1],params[2]);
        } else {
           return ns.formatter.image(params[0],params[1],params[2],params[3]);
        }
    },

    /**
     * @this {Object}
     * @param {string} token
     * @param {Object} ctx
     */
    _getCompany: function(token, ctx) {
        var field = this._getToken(token);
        var p = field.indexOf(this._formatterSeparator);
        if (p>-1) {
            field = field.substring(0,p);
        }
        if (field == 'formlogo' || field == 'pagelogo') {
            var dpi = (ns.isAssigned(ctx["dpiLogo"])) ? (' dpi="'+ctx["dpiLogo"]+'"') : '';
            return ['<img src="', nlapiEscapeXML(ns._website+ nlapiLoadFile(ns.getCompanyInfo(field)).getURL()), '"' , dpi , ' border="0" />'].join('');
        } else {
            return ns.getCompanyInfo(field);
        }
    },

    _getFormatted: function(value, format) {
        if (format!=null) {
            var x = format.indexOf('(');
            if (x>-1) {
                format = format.substring(0, x+1) + 'value' + ((format.charAt(x+1)==')') ? '' : ',') + format.substring(x+1);
            } else {
                format = format + '(value);';
            }
            try {
                value = eval('ns.formatter.'+format);
            } catch(ex) {
                throw nlapiCreateError('INVALID_FORMATTER','Invalid or unknown formatter method: ns.formatter.'+format);
            }
        }
        return value;
    },

    /**
     * Requires 'recId' and 'recType' in ns.context.
     * Resolves '{rec.field}' and '{rec.entity.field}'
     * Limitation: record type of entity must be declared in array this._entityType.
     * @this {Object}
     * @param {string} token
     * @param {Object} ctx
     * @param {boolean} asValue
     * @param {boolean} isEscaped Default is true (XML escaped).
     */
    _getRecord: function(token, ctx, asValue, isEscaped) {
        var format = null;
        try {
            token = this._getToken(token);
            var pos = token.indexOf(',');
            if (pos>-1) {
                format = token.substring(pos+1);
                token = token.substring(0,pos);
            }
            var value = ns.getField(ctx["recType"], ctx["recId"], token, asValue, (format==null));
            value = this._getFormatted(value, format);
            return (isEscaped===false || format=='checkbox') ? value : ns.formatter.stringToXml(value);
        } catch(e) {
            var msg = (e.message!=null) ? e.message : e;
            throw nlapiCreateError('INVALID_FIELD_NAME','ns.context._getRecord: Invalid token="'+token+'" format="'+format+'": '+msg);
        }
    },

    /**
     * Retrieve date and time format from company general preferences.
     * @this {Object}
     * @return {Object} Current context object
     */
    useCompanyDateTimeFormat: function() {
        var context = nlapiGetContext();
        this._context['formatDate'] = context.getPreference('dateformat');
        this._context['formatTime'] = this._timeFormats[context.getPreference('timeformat')];
        this._context['formatDateTime'] = this._context['formatDate']+' '+this._context['formatTime'];
        this._context['zeroPadding'] = false;
        return this;
    },

    /**
     * Add name and function to function lookup.
     * @this {Object}
     * @param {string} name Name must in token format (enclosed with { and } ).
     * @param {Object} func Function to call for token.
     * @return {Object} Current context object
     */
    addFunction: function(name, func) {
        this._lookup[name] = func;
        return this;
    },

    /**
     * Add name and value pair to ns.context.
     * @this {Object}
     * @param {string} name Name of item. Token names must in token format (enclosed with { and } ).
     *                      Configuration parameters are not enclosed in { and }. (e.g. gmt)
     * @param {Object} value Value for item.
     * @return {Object} Current context object
     */
    set: function(name, value) {
        this._context[name] = value;
        return this;
    },

    /**
     * Get value given the name. Use this to get single token values directly (w/o extra text).
     * Use ns.context.replace for multiple tokens (with extra text).
     * <pre>ns.context.get('{rec.entity');
     * ns.context.get('gmt');
     * </pre>
     * @this {Object}
     * @param {Object} name Name of item. Token names must in token format (enclosed with { and } ).
     *                      Configuration parameters are not enclosed in { and }. (e.g. gmt)
     * @param {boolean} isEscaped Whether value is XML escaped or not. Default is false. Use .getXml() for escaped values.
     * @return {string|Object|number|null} value Current value of item in context
     */
    get: function(name, isEscaped) {
        if (isEscaped == null) {
            isEscaped = false;
        }
        if (name.charAt(0)=='{') { //if token
            var ch = name.charAt(2),
                format = null;
            if (ch==ns._fieldSeparator) { //shortcuts
                if (name.indexOf('{s')==0) {
                    return '<span class="'+name.substring(3,name.length-1)+'">';
                } else if (name.indexOf('{d')==0) {
                    return '<div class="'+name.substring(3,name.length-1)+'"><span/>';
                } else if (name.indexOf('{p')==0) {
                    return '<p class="'+name.substring(3,name.length-1)+'">';
                }
            } else if (ch=='=') { //shortcuts
                if (name.indexOf('{s')==0) {
                    return '<span style="'+name.substring(3,name.length-1)+'">';
                } else if (name.indexOf('{d')==0) {
                    return '<div style="'+name.substring(3,name.length-1)+'"><span/>';
                } else if (name.indexOf('{p')==0) {
                    return '<p style="'+name.substring(3,name.length-1)+'">';
                }
            } else if (ch=='}') {
                if (name=='{s}') {
                    return '<span>';
                } else if (name=='{d}') {
                    return '<div><span/>';
                } else if (name=='{p}') {
                    return '<p>';
                }
            } else if (name.charAt(1)=='/') {
                if (name=='{/s}') {
                    return '</span>';
                } else if (name=='{/d}') {
                    return '</div>'; //workaround, empty span needed to prevent XML error (bug in pdf?)
                } else if (name=='{/p}') {
                    return '</p>';
                }
            } else {
                if (name.indexOf('{rec.') == 0) {
                    return this._getRecord(name, this._context, false, isEscaped);
                } else if (name.indexOf('{@rec.')==0) {
                    return this._getRecord(name, this._context, true, isEscaped);
                } else if (name.indexOf('{img.')==0) {
                    return this._getImage(name, this._context);
                } else if (name == '{date}' || name.indexOf('{date.') == 0) {
                    return this._getDate(name, this._context);
                } else if (name=='{datetime}') {
                    return this._getDateTime(this._context);
                } else if (name.indexOf('{func.')==0) {
                    var func = name.substring(6,name.length-1),
                        funcResult = null;
                    try {
                        funcResult = eval(func+ ((func.indexOf('(')==-1)?'()':''));
                    } catch(ex) {
                        throw nlapiCreateError('INVALID_FUNCTION','Invalid function in {func.'+func+'}:'+ex.toString());
                    }
                    if (typeof funcResult=='object' && funcResult instanceof ns.TableWiki) {
                        return this.replace(funcResult.getHtml());
                    } else {
                        return funcResult;
                    }
                } else {
                    var pos = name.indexOf(this._formatterSeparator);
                    if (pos>-1) {
                        format = name.substring(pos+1, name.length-1);
                        name = name.substring(0,pos)+'}';
                    }
                    if (ns.isNotAssigned(this._context[name])) {
                        if (name.indexOf('{com.')==0) {
                            this._context[name] = this._getCompany(name, this._context);
                        } else if (ns.isAssigned(this._lookup[name])) {
                            //token linked to a function
                            this._context[name] = this._lookup[name](this._context);
                        }
                    }//if not assigned
                }//else
            }
            //for tokens that are user defined, this._lookup and for {com.*}
            var value = this._getFormatted(this._context[name], format);
            //don't escape HTML img tags for company logos
            return (isEscaped===false || name=='{com.formlogo}' || name=='{com.pagelogo}' || format=='checkbox')
                   ? value : ns.formatter.stringToXml(value);
        } else {
            //non-token
            return this._context[name];
        }
    },

    /**
     * Get XML escaped value.
     * @this {Object}
     * @param {Object} name Name of item. Token names must in token format (enclosed with { and } ).
     *                      Configuration parameters are not enclosed in { and }. (e.g. gmt)
     * @return {Object} value
     */
    getXml: function(name) {
        return this.get(name, true);
    },

    /**
     * Get unescaped value, using the default value if value is null.
     * @this {Object}
     * @param {Object} name Name of item. Token names must in token format (enclosed with { and } ).
     *                      Configuration parameters are not enclosed in { and }. (e.g. gmt)
     * @param {Object} defaultValue Default value
     * @return {Object} value
     */
    getIf: function(name, defaultValue) {
        var value = this.get(name);
        return ns.isNotAssigned(value) ? defaultValue : value;
    },

    /**
     * Get XML escaped value, using the default value if value is null.
     * @this {Object}
     * @param {Object} name Name of item. Token names must in token format (enclosed with { and } ).
     *                      Configuration parameters are not enclosed in { and }. (e.g. gmt)
     * @param {Object} defaultValue Default value
     * @return {Object} value
     */
    getXmlIf: function(name, defaultValue) {
        var value = this.get(name, true);
        return ns.isNotAssigned(value) ? defaultValue : value;
    },

    /**
     * Copy over values from request object.
     * custpage_rec_id will be added as recId, custpage_rec_type will be added as recType.
     * @this {Object}
     * @param {Object} request NetSuite request object (nlobjRequest).
     * @return {Object} Current context object
     */
    addRequest: function(request) {
        var log = [],
            params = request.getAllParameters();
        for(var p in params) {
            if (p == 'custpage_rec_id') {
                this._context['recId'] = params[p];
            } else if (p == 'custpage_rec_type') {
                this._context['recType'] = params[p];
            } else {
                this._context[p] = params[p];
            }
            log.push(p);
            log.push('=');
            log.push(params[p]);
            log.push('\n');
        }
        nlapiLogExecution('DEBUG','ns.context.addRequest', log.join(''));
        return this;
    },

    /**
     * Return the context array.
     * Optional.
     * @this {Object}
     * @return {Object} Context item list
     */
    getContext: function() {
        return this._context;
    },

    /**
     * Replace will translate text with tokens into its actual values by using values in the ns.context.
     * Required.
     * Lookup functions can be defined to populate the ns.context.
     * Values in the context are being cached, so tokens must refer to one record at a time only.
     * You need to clear the context before using.
     * e.g. 'abc{item}abc' into 'abcdefabc' where {item}=def;
     * @this {Object}
     * @param {string} content String with embeded tokens.
     * @param {boolean} isEscaped Default is false. (Not XML escaped).
     * @return {string} Replaced string with actual values.
     */
    replace: function(content, isEscaped) {
        return content.replace(/\{(.+?)\}/g, function(match, number) {
                   var tokenValue = ns.context.get(match, isEscaped);
                   if (tokenValue!=undefined && tokenValue.indexOf(ns._multiselectSeparator)) {
                       tokenValue = tokenValue.split(ns._multiselectSeparator).join(', ');
                   }
                   return (tokenValue==undefined) ? '' : tokenValue;
                });
    },

    /**
     * Replace will translate text with tokens into its actual values by using values in the ns.context.
     * (XML escaped version)
     *
     * @this {Object}
     * @param {string} content String with embeded tokens.
     * @return {string} Replaced string with actual values.
     */
    replaceXml: function(content) {
        return this.replace(content, true);
    }

};

/**
 * @class TableWiki allows you to use WIKI-like syntax to create HTML tables.
 * <b>To escape the &brvbar; symbol use &amp;#166;</b>
 * There must be a space between pipe symbol (to the left of text) and actual text
 * <pre>
 * | text|
 * </pre>
 * Formatting attributes must be adjacent to pipe symbol
 * <pre>
 * |30%2h1v Test|
 * |12pt.bgrd Test Two|       //.bgrd means TD css class name "bgrd"
 * </pre>
 * Specifying the row height:
 * <pre>
 * 100px| text|              //if line does not start with |, it means that row height is specified.
 * </pre>
 * Adding a TableWiki
 * <pre>
 * pdf.add(new ns.TableWiki()
 *         .setCssPrefix('plain')
 *         .add([
 *             '|200px {company.formlogo}|R Date: {timestamp}|',
 *             '|2cC {company.companyname}|'
 *         ])
 * );
 * </pre>
 * <b>Attributes are case sensitive:</b>
 * <table width="100%">
 * <tr><td width="200px">T</td><td>top (vertical alignment).</td></tr>
 * <tr><td>M</td><td>middle (vertical alignment).</td></tr>
 * <tr><td>B</td><td>bottom (vertical alignment).</td></tr>
 * <tr><td>L</td><td>Left align for text.</td></tr>
 * <tr><td>C</td><td>Center align for text.</td></tr>
 * <tr><td>R</td><td>Right align for text.</td></tr>
 * <tr><td>v</td><td>Vertical text. Should be used with row height and middle vertical align.</td></tr>
 * <tr><td>30%</td><td>Table TD width in percentage.</td></tr>
 * <tr><td>100px</td><td>Table TD width in pixels.</td></tr>
 * <tr><td>12pt</td><td>Font-size in points.</td></tr>
 * <tr><td>2c</td><td>Table colspan.</td></tr>
 * <tr><td>2r</td><td>Table rowspan.</td></tr>
 * <tr><td>b</td><td>Bold font.</td></tr>
 * <tr><td>i</td><td>Italics font.</td></tr>
 * <tr><td>[</td><td>Left border. (Use TableWiki.setBorderList for multiple border styles.)</td></tr>
 * <tr><td>]</td><td>Right border.</td></tr>
 * <tr><td>^</td><td>Top border.</td></tr>
 * <tr><td>_</td><td>Bottom border.</td></tr>
 * <tr><td valign="top">.className</td><td>Table TD CSS.
 * Must be the last part of attribute since everything after period is the css class name)</td></tr>
 * </table>
 *
 * <b>Borders have three modes:</b>
 * <table width="100%">
 * <tr><td width="200px" valign="top">Grid mode</td><td>Use TableWiki.useGridMode. Borders are automatically built up by TableWiki.
 * The CSS definitions themselves must not contain border definitions as these borders are created by TableWiki.</td></tr>
 * <tr><td valign="top">Border attributes mode</td><td>If you plan to use [ ] ^ _ attributes, do not
 * use TableWiki.useGridMode or TableWiki.setBorder. You can use TableWiki.setBorderList to define an array of border definitions and prefix the array index with the border attribute to use multiple border styles.</td></tr>
 * <tr><td valign="top">Custom CSS mode</td><td>If you plan to use CSS definitions with border definitions.
 * Do not use TableWiki.useGridMode. </td></tr>
 * </table>
 * <pre>
 * pdf.add(new ns.TableWiki()
 *         .setBorderList([ '1pt solid black', '1pt dashed red', '1pt dotted green'])
 *         //prefix the array index in front of border attribute
 *         .add([
 *             '|^_1[] a|1[]2^_ b|'          //for cell "a", top and bottom will use 0 array index (by default, solid black)
 *                                           //            , left and right will use 1 array index (dashed red)
 *                                           //for cell "b", left and right will use 1 array index (dashed red)
 *                                           //            , top and bottom will use 2 array index (dotted green)
 *         ])
 * );
 * </pre>
 * By default, there is no borders set for TableWiki.
 *
 * <b>Setting properties by passing an object and array to the TableWiki constructor:</b>
 * <pre>new ns.TableWiki( parameters, array )
 * //parameters = object literal (see list of properties below)
 * //array = literal array of wiki definitions (alternative to using method add)
 * </pre>
 * <pre>pdf.add(new ns.TableWiki({
 *                  cssPrefix:'plain',
 *                  gridMode: true
 *             },[
 *                '|L Test|R Test|'
 *             ]);
 * </pre>
 * The following properties are available as alternative to calling methods.
 * <table width="100%">
 * <tr><td width="200px" valign="top">cssPrefix</td><td valign="top">setCssPrefix</td></tr>
 * <tr><td valign="top">cellCss</td><td valign="top">setCellCss</td></tr>
 * <tr><td valign="top">textCss</td><td valign="top">setTextCss</td></tr>
 * <tr><td valign="top">tableCss</td><td valign="top">setTableCss</td></tr>
 * <tr><td valign="top">tableWidth</td><td valign="top">setTableWidth</td></tr>
 * <tr><td valign="top">tableStyle</td><td valign="top">setTableStyle</td></tr>
 * <tr><td valign="top">gridMode</td><td valign="top">useGridMode</td></tr>
 * <tr><td valign="top">borderList</td><td valign="top">setBorderList</td></tr>
 * <tr><td valign="top">border</td><td valign="top">setBorder</td></tr>
 * <tr><td valign="top">stackedMode</td><td valign="top">useStackedMode</td></tr>
 * <tr><td valign="top">verticalMode</td><td valign="top">useVerticalMode</td></tr>
 * <tr><td valign="top">repeatHeaders</td><td valign="top">setRepeatHeaders</td></tr>*
 * </table>
 *
 * @description Constructor for TableWiki class.
 * Required.
 * @constructor
 * @param {Object} options Object containing options.
 * @param {Object} content Array of WIKI strings.
 */
ns.TableWiki = function(options, content){
    this._verticalMode = false;
    this._repeatHeaders = false; //first line
    this._cellCss = null;
    this._textCss = null;
    this._tableCss = null;
    this._tableWidth = '100%';
    this._tableStyle = null;
    this._gridMode = false;
    this._borderList = ['0.75pt solid black;','0.75pt dashed black;','0.75pt dotted black;'];
    this._border = '0.75pt solid black;';
    this._content = (content==null) ? [] : content;
    this._stackedMode = false;
    for(var opt in options) {
        if (opt == 'cssPrefix') {
            this.setCssPrefix(options[opt]);
        } else {
            this['_' + opt] = options[opt];
        }
    }
    return this;
}

/**
 * Specify a set of CSS classes. Naming convention for group of CSS is to have similar suffixes,
 * only the prefix is different.
 * @param {string} prefix Prefix for set of CSS class names.
 * @return {ns.TableWiki} Current TableWiki object
 */
ns.TableWiki.prototype.setCssPrefix = function(prefix) {
    this._tableCss = prefix+'Table';
    this._cellCss = [ prefix+'HdrCell', prefix+'RowCell'];
    this._textCss = [ [prefix+'HdrText'], [prefix+'RowText'] ];
    return this;
};

/**
 * Use vertical mode.The odd number columns are headers, even number are values.
 * Optional. Intended for building report headers. (Report headers, not table headers)
 * @return {ns.TableWiki} Current TableWiki object
 */
ns.TableWiki.prototype.useVerticalMode = function() {
    this._verticalMode = true;
    return this;
};

/**
 * Turn on/off repetition of headers in succeeding pages.
 * @param {boolean} repeatHeaders True to repeat headers, otherwise false. Default is true.
 * @return {ns.TableWiki} Current TableWiki object
 */
ns.TableWiki.prototype.setRepeatHeaders = function(repeatHeaders) {
    this._repeatHeaders = repeatHeaders;
    return this;
};

/**
 * Stacked mode is a table without the top border. It is designed to be used for forms
 * with different column layout in a page. Several TableWIki can be joined to form one big form.
 * The top TableWiki will have all borders on, succeeding TableWikis below will have the top border removed
 * in order to prevent having a thicker border line in between tables.
 * Stacked mode is used with the grid mode on.
 *
 * @return {ns.TableWiki} Current TableWiki object
 */
ns.TableWiki.prototype.useStackedMode = function() {
    this._stackedMode = true;
    return this;
};

/**
 * Use grid mode (default border style) (TableWiki builds up the borders, CSS definitions should not have border definitions)
 * @return {ns.TableWiki} Current TableWiki object
 */
ns.TableWiki.prototype.useGridMode = function() {
    this._gridMode = true;
    return this;
};

/**
 * Use grid mode (set custom border style) (TableWiki builds up the borders, CSS definitions should not have border definitions)
 * @param {string} border (e.g. "1pt solid black")
 * @return {ns.TableWiki} Current TableWiki object
 */
ns.TableWiki.prototype.setBorder = function(border) {
    this._border = (border==null) ? null : ns.addLastChar(border,';');
    return this;
};

/**
 * Set border styles used with [ ] ^ _.
 * @param {Array} border Border object (e.g. ['0.75pt solid black;', '1pt dashed red;] usage: 0[]1^_)
 * @return {ns.TableWiki} Current TableWiki object
 */
ns.TableWiki.prototype.setBorderList = function(border) {
    for(var i=0; i<border.length; i++) {
        border[i] = ns.addLastChar(border[i],';');
    }
    this._borderList = border;
    return this;
};

/**
 * Set width for the table. Default is '100%'.
 * @param {string} width Table width (e.g. '100%' or '500px')
 * @return {ns.TableWiki} Current TableWiki object
 */
ns.TableWiki.prototype.setTableWidth = function(width) {
    this._tableWidth = width;
    return this;
};

/**
 * Set additional table inline style, use this to set the background-image and background-image-dpi.
 * Optional.
 * @param {string} tableStyle Table inline style CSS.
 * @return {ns.TableWiki} Current TableWiki object
 */
ns.TableWiki.prototype.setTableStyle = function(tableStyle) {
    this._tableStyle = tableStyle;
    return this;
};

/**
 * Set table CSS class.
 * Optional.
 * @param {string} tableCss Table CSS class names.
 * @return {ns.TableWiki} Current TableWiki object
 */
ns.TableWiki.prototype.setTableCss = function(tableCss) {
    this._tableCss = tableCss;
    return this;
};

/**
 * Set table TD CSS class.
 * Each item in array corresponds to one row in the table.
 * If there are more actual rows than those specified in array,
 * last value in array will be reused.
 * Optional.
 * @param {Array} aCellCss Array of class names.
 * @return {ns.TableWiki} Current TableWiki object
 */
ns.TableWiki.prototype.setCellCss = function(aCellCss) {
    this._cellCss = aCellCss;
    return this;
};

/**
 * Set &lt;p&gt; CSS class (text within table cell).
 * Array of array corresponds to each cell (row and col).
 * If there are more actual columns or rows than those specified in array,
 * last value in array will be reused.
 * Optional.
 * @param {Array} aTextCss Array of array of class names. (2 dimensional array)
 * @return {ns.TableWiki} Current TableWiki object
 */
ns.TableWiki.prototype.setTextCss = function(aTextCss) {
    this._textCss = aTextCss;
    return this;
};

/**
 * Internal function.
 * @param {number} row
 * @param {number} col
 * @return {string} cls
 */
ns.TableWiki.prototype._getCellCss = function(row, col) {
    var cls = "";
    if (ns.isAssigned(this._cellCss)) {
        if (typeof this._cellCss=='string') {
            cls = this._cellCss;
        } else {
            if (ns.isTrue(this._verticalMode)) {
                cls = ((col + 1) % 2 == 0) ? this._cellCss[1] : this._cellCss[0];
            }
            else {
                cls = this._cellCss[row];
                if (ns.isNotAssigned(cls)) {
                    cls = this._cellCss[this._cellCss.length - 1];
                }
            }
        }
        if (ns.isNotEmpty(cls)) {
            cls = ' class="'+cls+'"';
        }
    }
    return cls;
};

/**
 * Internal function.
 * @param {number} row
 * @param {number} col
 */
ns.TableWiki.prototype._getTextCss = function(row, col) {
    var cls = "";
    if (ns.isAssigned(this._textCss)) {
        if (typeof this._textCss=='string') {
            cls = this._textCss;
        } else {
            if (ns.isTrue(this._verticalMode)) {
                cls = ((col+1)%2==0) ? (this._textCss[1][0]) : (this._textCss[0][0]);
            }
            else {
                var rowCls = this._textCss[row];
                if (ns.isNotAssigned(rowCls)) {
                    rowCls = this._textCss[this._textCss.length - 1];
                }
                cls = rowCls[col];
                if (ns.isNotAssigned(cls)) {
                    cls = rowCls[rowCls.length - 1];
                }
            }
        }
        if (ns.isNotEmpty(cls)) {
            cls = ' class="'+cls+'"';
        }
    }
    return cls;
};

/**
 * Internal function.
 * @param {Array} aWiki
 */
ns.TableWiki.prototype._countCol = function(aWiki) {
   var c = 1, len = aWiki.length;
   for(var i=0; i<len;i++) {
       c = Math.max(c, (aWiki[i].split('|').length-2));
   }
   return c;
};

/**
 * Internal function.
 * @param {string} attr
 * @param {number} pos
 */
ns.TableWiki.prototype._getNumber = function(attr, pos) {
    var p = pos-1,
        text = "",
        ch = attr.charAt(p);
    while(p>=0 && (!isNaN(ch) || ch=='.')) {
        text = ch + text;
        p--;
        ch = attr.charAt(p);
    }
    return text;
};

/**
 * Internal function.
 * @param {string} attr
 * @param {number} pos
 */
ns.TableWiki.prototype._getBorderNumber = function(attr, pos) {
    var p = pos-1,
        text = "",
        ch = attr.charAt(p),
        isAttr = '.[]_^'.indexOf(ch)>-1;
    while(p>=0 && (!isNaN(ch) || isAttr)) {
        if (!isAttr) {
            text = ch + text;
        }
        p--;
        ch = attr.charAt(p);
        isAttr = '.[]_^'.indexOf(ch)>-1;
    }
    return (text=='') ? 0 : parseInt(text,10);
};

/**
 * Internal function.
 * @param {string} attr
 * @param {number} row
 * @param {number} col
 * @param {number} rowMax
 * @param {number} colMax
 * @param {boolean} hasNoSpan
 * @param {number} span
 * @return {Array} Cell attribute
 */
ns.TableWiki.prototype._getCellAttr = function(attr,row, col, rowMax, colMax, hasNoSpan,span) {
    //TMB 30% 1c 2r
    var text = [];
    if (ns.isNotEmpty(attr)) {
        text.push( (attr.indexOf('T')>-1) ? ' valign="top"' : '' );
        text.push( (attr.indexOf('M')>-1) ? ' valign="middle"' : '' );
        text.push( (attr.indexOf('B')>-1) ? ' valign="bottom"' : '' );
        var p = attr.indexOf('%');
        if (p>-1) {
            text.push(' width="');
            text.push(this._getNumber(attr, p));
            text.push('%"' );
        }
        p = attr.indexOf('px');
        if (p>-1) {
            text.push(' width="');
            text.push(this._getNumber(attr, p));
            text.push('px"');
        }
        p = attr.indexOf('c');
        if (p>-1) {
            text.push(' colspan="');
            text.push(this._getNumber(attr, p));
            text.push('"');
        }
        p = attr.indexOf('r');
        if (p>-1) {
            text.push(' rowspan="');
            text.push(this._getNumber(attr, p));
            text.push('"');
        }
    }
    if (hasNoSpan && col==0 && span>1) { //adjust if no colspan is specified
        text.push(' colspan="');
        text.push(span);
        text.push('"');
    }
    if (this._gridMode) {
        var style = [' border-left: ', this._border];
        if ((hasNoSpan && col==(colMax-1)) ||
            (!hasNoSpan && col==(colMax-span))) {
            style.push(' border-right: ');
            style.push(this._border);
        }
        if (row==0 && !this._stackedMode) {
            style.push('border-top: ');
            style.push(this._border);
        }
        style.push('border-bottom: ');
        style.push(this._border);
        text.push(' style="');
        text = text.concat(style);
        text.push('"');
    } else {
        var style = [],
            p = attr.indexOf('[');
        if (p>-1) {
            style.push(' border-left:');
            style.push(this._borderList[this._getBorderNumber(attr, p)]);
        }
        p = attr.indexOf(']');
        if (p>-1) {
            style.push(' border-right:');
            style.push(this._borderList[this._getBorderNumber(attr, p)]);
        }
        p = attr.indexOf('_');
        if (p>-1) {
            style.push(' border-bottom:');
            style.push(this._borderList[this._getBorderNumber(attr, p)]);
        }
        p = attr.indexOf('^');
        if (p>-1) {
            style.push(' border-top:');
            style.push(this._borderList[this._getBorderNumber(attr, p)]);
        }
        text.push(' style="');
        text = text.concat(style);
        text.push('"');
    }
    return text;
};

/**
 * Internal function.
 * @param {string} attr
 */
ns.TableWiki.prototype._getTextAttr = function(attr) {
    //L C R i b pt v
    var text = [];
    if (ns.isNotEmpty(attr)) {
        text.push((attr.indexOf('v')>-1) ? ' rotate="-90"' : '');
        var style = [];
        var align = false;
        if (attr.indexOf('L')>-1) {
            style.push('text-align:left;');
            align = true;
        }
        if (attr.indexOf('C')>-1) {
            style.push('text-align:center;');
            align = true;
        }
        if (attr.indexOf('R')>-1) {
            style.push('text-align:right;');
            align = true;
        }
        if (align) {
            style.push('width:100%;');
        }
        var p = attr.indexOf('pt');
        if (p>-1) {
            style.push('font-size:');
            style.push(this._getNumber(attr, p));
            style.push('pt;');
        }
        p = attr.indexOf('b');
        if (p>-1) {
            style.push('font-weight: bold;');
        }
        p = attr.indexOf('i');
        if (p>-1) {
            style.push('font-style: italics;');
        }
        if (style.length>0) {
            text.push(' style="');
            text = text.concat(style);
            text.push('"');
        }
    }
    return text;
};

/**
 * Add WIKI strings or an array of WIKI strings.
 * Required.
 * @param {string|Array} wiki Single or array of text. Each item is one row.
 * @return {ns.TableWiki} Current TableWiki object
 */
ns.TableWiki.prototype.add = function(wiki){
    if (typeof wiki == 'string') {
        this._content.push(wiki);
    } else { //array
        this._content = this._content.concat(wiki);
    }
    return this;
};

/**
 * Return  table as HTML.
 * Optional.
 * @param {boolean=} rowOnly True will return TR element without TABLE. False will return whole TABLE. Default is false.
 * @return {string} HTML for this whole table or table rows depending on rowOnly parameter.
 */
ns.TableWiki.prototype.getHtml = function(rowOnly) {
   rowOnly = (rowOnly) ? rowOnly : false;
   var maxCol = this._countCol(this._content),
       maxRow = this._content.length,
       html = (rowOnly) ? [] :
              ['<table',
              ((this._tableWidth) ? (' width="' + this._tableWidth + '"') : ''),
              ((this._tableCss) ? (' class="'+ this._tableCss +'"') : '') ,
              ((this._tableStyle) ? (' style="'+ this._tableStyle +'"') : ''), '>'],
       attrPattern = /^(((\d*(\[|\]|_|\^))|T|M|B|L|C|R|i|b|v|(\d+pt)|(\d+px)|(\d+(%|c|r)))+)$/,  //TODO debug 9.5pt not working in netsuite, works in firefox
       rowHtPattern = /^(\d+(%|px))$/,
       hasNoRowSpan = true;
   for(var r=0; r<maxRow; r++) {
       var rowText =  ns.formatter.trim(this._content[r]),
           rowHt = null;
       if (rowText.charAt(0)!='|') {
           var p = rowText.indexOf('|');
           if (p > -1) {
               rowHt = rowText.substring(0, p);
               rowText = rowText.substring(p);
               if (rowHtPattern.test(rowHt)==false) {
                  throw nlapiCreateError('INVALID_ROW_HEIGHT', 'TableWiki.getRawHtml: Invalid row height at line ' + (r+1) + ': ' + rowHt+' in \n'+this._content[r]);
               }
           } else {
               throw nlapiCreateError('MISSING_PIPE_SYMBOL','TableWiki.getRawHtml: Missing pipe symbol at line '+(r+1)+' in \n'+this._content[r]);
           }
       }
       if (rowText.charAt(rowText.length-1)!='|') {
           rowText += '|';
       }
       if (r==0 && this._repeatHeaders==true) {
           html.push('<thead>');
       }
       html.push('<tr');
       html.push((rowHt==null)?'':' height="'+rowHt+'"');
       html.push('>');
       var cells = rowText.split('|'),
           len = cells.length-2,
           span = maxCol-len+1,
           //check for colspan attr
           hasNoColSpan = true;
       for (var c = 0; c < len; c++) {
           var cell = cells[c + 1];
           var pos = cell.indexOf(' ');
           var attr = null;
           if (pos > 0) {
               attr = cell.substring(0, pos);
           }
           if (attr) {
               if (attr.indexOf('c')>-1) {
                   hasNoColSpan = false;
               }
               if (attr.indexOf('r')>-1) {
                   hasNoRowSpan = false;
               }
           }
       }
       //build html
       for(var c=0; c<len; c++) {
           var cell = cells[c+1],
               pos = cell.indexOf(' '),
               attr = null,
               cls = null;
           if (pos>-1) {
               attr = cell.substring(0,pos);
               var p = attr.lastIndexOf('.');
               if (p>-1 && isNaN(attr.substring(p,p+1))) {
                   cls = ' class="'+attr.substring(p+1)+'"';
                   attr = attr.substring(0, p);
               }
               if (ns.isNotEmpty(attr) && attrPattern.test(attr)==false) {
                  throw nlapiCreateError('INVALID_ATTRIBUTE', 'TableWiki.getRawHtml: Invalid attribute at line ' + (r+1) + ' column ' + (c+1) + ': ' + attr+' in \n'+this._content[r]);
               }
           } else {
              throw nlapiCreateError('MISSING_SPACE', 'TableWiki.getRawHtml: Missing space at line ' + (r+1) + ' column ' + (c+1) + ': ' + cell+' in \n'+this._content[r]);
           }
           var text = cell.substring(pos+1);
           html.push('<td');
           html.push((cls==null) ? this._getCellCss(r,c) : cls);
           html = html.concat(this._getCellAttr(attr, r, c, maxRow, maxCol, (hasNoColSpan && hasNoRowSpan),span));
           html.push('><p');
           html.push(this._getTextCss(r,c));
           html = html.concat(this._getTextAttr(attr));
           html.push('>');
           html.push(text);
           html.push('</p></td>');
       }
       html.push('</tr>');
       if (r==0 && this._repeatHeaders==true) {
           html.push('</thead><tbody>');
       }
   }
   html.push((rowOnly) ? '' : ((this._repeatHeaders)?'</tbody>':'')+'</table>');
   return html.join('');
};

/**
 * @class Constructs a table based on data from a saved search or virtual columns and functions.
 * <table width="100%">
 * <tr><td width="200px" valign="top">Saved search driven mode</td><td>Default. The order and columns in the saved search are followed, unless excluded. The column attributes array only supplements the saved search.</td></tr>
 * <tr><td valign="top">Column array driven mode</td><td>Use TableSearch.useColumnDrivenMode. The columns in the column attributes array are displayed in order in the array.</td></tr>
 * </table>
 * <b>Saved Search Driven Mode</b>
 * <pre>pdf.add(new ns.TableSearch()                //all columns from saved search are displayed unless excluded
 *         .setCssPrefix('grid')            //grid table
 *         .useGridMode()
 *         .exclude(['itemid', 'name', 'description'])               //excluded saved search columns
 *         .setColumns([{name:'quantitycommitted', nullText:'0' }])  //array of optional column attributes
 *         .setSearch('transaction','customsearch_test',
 *                    [new nlobjSearchFilter("internalid", null, "is", recId)], null) //same parameters as nlapiSearchRecord
 * );
 * </pre>
 * <b>Column Array Driven Mode</b>
 * <pre>
 * var columns = [                          //only columns defined in column attribute array will be displayed
 *       { name: 'itemid', title: 'Item' },
 *       { name: 'quantitycommitted', title: 'Qty Committed' }
 * ];
 * pdf.add(new ns.TableSearch()
 *         .setCssPrefix('grid')            //grid table
 *         .useGridMode()
 *         .useColumnDrivenMode()
 *         .setColumns(columns, false)      //array of column attributes
 *         .setSearch('transaction','customsearch_test',
 *                    [new nlobjSearchFilter("internalid", null, "is", recId)], null) //same parameters as nlapiSearchRecord
 * );
 * </pre>
 *
 * Column attributes control the display, the values, and the sub and grand totals. For example:
 * <pre>
 * [
 *    { name: 'column', rownum: true },                        // first column has auto row numbering
 *    { name: '_spacer1', spacer: true },                      // create a spacing column
 *    { name: 0, align: center, formatter: ns.formatter.integer }, // display as integer
 *    { name: '_calc', func: function(index, columns, rec) {   // custom function to calculate sum
 *                         return parseInt(rec.getValue('fieldName1')) + parseInt(rec.getValue('fieldName2'));
 *                     }
 *    }
 * ]
 * </pre>
 * <b>List of colunm attributes:</b>
 * <table width="100%" border="0">
 * <tr><td width="200px" valign="top">name: 'column',</td><td valign="top">
 *   Required. Can be number (index in saved search) or string (name).
 *   For dummy columns (not mapped to saved search), it should start with '_' char.</td></tr>
 * <tr><td valign="top">width: '100px',</td><td valign="top">
 *   Specify the column width for table TD.</td></tr>
 * <tr><td valign="top">type: 'text',</td><td valign="top">
 *   Overwrite the column type (for dummy columns only)</td></tr>
 * <tr><td valign="top">html: true,</td><td valign="top">
 *   Specify that column value is HTML fragment already, so do not escape the value.</td></tr>
 * <tr><td valign="top">spacer: true,</td><td valign="top">
 *   Specify that column is blank spacing</td></tr>
 * <tr><td valign="top">show: 'value',</td><td valign="top">
 *   Force to show value instead of text (rec.getValue)</td></tr>
 * <tr><td valign="top">align: 'center',</td><td valign="top">
 *   Column text align ('left', 'right', 'center')</td></tr>
 * <tr><td valign="top">nullText : '-',</td><td valign="top">
 *   Display this string for null values</td></tr>
 * <tr><td valign="top">dpi: 200,</td><td valign="top">
 *   DPI setting for image columns</td></tr>
 * <tr><td valign="top">hdrCellCss: 'customCss',</td><td valign="top">
 *   Header Cell CSS for TD class (Complete CSS name, not just prefix)</td></tr>
 * <tr><td valign="top">hdrTextCss: 'customCss',</td><td valign="top">
 *   Header Text CSS for &lt;p&gt; class for text within TD</td></tr>
 * <tr><td valign="top">rowCellCss: 'customCss',</td><td valign="top">
 *   Row Cell CSS for TD class</td></tr>
 * <tr><td valign="top">rowTextCss: 'customCss',</td><td valign="top">
 *   Row Text CSS for &lt;p&gt; class for text within TD</td></tr>
 * <tr><td valign="top">formatter : ns.formatter.integer,</td><td valign="top">
 *   Specify function used to format the value (see formatter)</td></tr>
 * <tr><td valign="top">subTotalGroup: 'fieldName',</td><td valign="top">
 *   Specify the field to group on for sub totals.
 *   Current column type should be numeric, the column to group on can be any type.
 *   Sub total will be created when value of column to group on changes.</td></tr>
 * <tr><td valign="top">grandTotal: true,</td><td valign="top">
 *   Specify that this column will have a grand total (can be used in more than one column).
 *   If grand total is specified without subTotalGroup, no sub totals are created, only the grand total.
 *   If subTotalGroup is specified with grandTotal, then sub and grand total are created.</td></tr>
 * <tr><td valign="top">title: 'title',</td><td valign="top">  Title for column (overrides saved search label or name)
 *   If title is not specified, column label is used. If label is not specified, name is used.
 * <tr><td valign="top">rownum: true,</td><td valign="top">
 *   Auto number rows and display in this column.</td></tr>
 * <tr><td valign="top">func: customFunc,</td><td valign="top">
 *   Specify a function that returns a value.<br/>
 *   <i>function(index, columns, rec)</i><br/>
 *   where<br/><ul>
 *     <li>index is the current columnn index. Starts from zero.</li>
 *     <li>columns is an array of column attributes (and column meta from saved search) </li>
 *     <li>rec is the current record for the row.</li></ul>
 *   The index and columns contain only the visible columns in the table.
 *   This allows you to get the settings within your function.<br/>
 *   <i>column[index].name</i> = name of column<br/>
 *   The rec contains data from the saved search.<br/>
 *   <i>rec.getValue(rec.getAllColumns[0])</i><br/>
 *   returns the value from the first column in the saved search.<br/>
 *   <i>rec.getValue('fieldName');</i> returns the fieldName.<br/>
 *   <i>rec.getId();</i> returns the id of the record.<br/>
 * </td></tr>
 * <tr><td valign="top">$customField: 'customValue'</td><td  valign="top">
 *    Optional. For user defined custom fields, prefix with dollar sign to prevent conflict with framework.
 *    User defined custom fields can be used to pass values to custom functions.</td></tr>
 * </table>
 *
 * <b>Borders have two modes:</b>
 * <table width="100%">
 * <tr><td width="200px" valign="top">Grid mode</td><td>Use TableSearch.useGridMode. Borders are automatically built up by TableSearch.
 * The CSS definitions themselves must not contain border definitions as these borders are created by TableSearch.
 * If you plan to use the spacer attribute, use this mode.</td></tr>
 * <tr><td valign="top">Custom CSS mode</td><td>If you plan to use CSS definitions with border definitions.
 * Do not use TableSearch.useGridMode. In this mode, the spacer attribute may not display properly depending on your CSS border definition.
 * </td></tr>
 * </table>
 *
 * <b>Setting properties by passing object and search parameters to TableSearch constructor:</b>
 * <pre>new ns.TableSearch( parameters, searchRecType, searchId, searchFilters, searchColumns);
 * //parameters = object containing TableSearch properties (see list below)
 * //searchRecType, searchId, searchFilters, searchColumns = similar as parameters to nlapiSearchRecord
 * </pre>
 * <pre>pdf.add( new ns.TableSearch({
 *                  cssPrefix: 'grid',
 *                  gridMode: true,
 *                  exclude: ['itemid', 'name', 'description'],
 *                  headerFunc: function(columns) {
 *                                 //return a function with ns.TableWiki object or html string or html array
 *                                 //note that if you want to set the column widths, you must set it for the whole row for it to take effect
 *                                 return new ns.TableWiki({
 *                                                cssPrefix:'grid',
 *                                                gridMode:true
 *                                            },[
 *                                                '|12ptbC3c Item|12ptbC4c Inventory|',
 *                                                '80px|Mbi20%C Name|Mbi40%C Description|Mbi20%C Type|vMb5%C Committed|vMb5%C Available|vMb5%C Back Ordered|vMb5%C On Order|'
 *                                            ]);
 *                              },//function
 *                  columns: [
 *                      { name:'quantitycommitted', nullText:'0',formatter:ns.formatter.integer}
 *                  ]
 *              },
 *                  'item','customsearch_gus_item')
 *        );
 * </pre>
 * The following properties are available as alternative to calling methods.
 * <table width="100%">
 * <tr><td width="200px" valign="top">cssPrefix</td><td valign="top">setCssPrefix</td></tr>
 * <tr><td valign="top">gridMode</td><td valign="top">useGridMode</td></tr>
 * <tr><td valign="top">border</td><td valign="top">setBorder</td></tr>
 * <tr><td valign="top">columnDrivenMode</td><td valign="top">useColumnDrivenMode</td></tr>
 * <tr><td valign="top">rowFunc</td><td valign="top">setRowFunction</td></tr>
 * <tr><td valign="top">preFunc</td><td valign="top">setPreFunction</td></tr>
 * <tr><td valign="top">postFunc</td><td valign="top">setPostFunction</td></tr>
 * <tr><td valign="top">headerFunc</td><td valign="top">setHeaderFunction</td></tr>
 * <tr><td valign="top">subTotalFunc</td><td valign="top">setSubTotalFunction</td></tr>
 * <tr><td valign="top">grandTotalFunc</td><td valign="top">setGrandTotalFunction</td></tr>
 * <tr><td valign="top">grandTotal</td><td valign="top">setGrandTotal</td></tr>
 * <tr><td valign="top">subTotal</td><td valign="top">setSubTotal</td></tr>
 * <tr><td valign="top">exclude</td><td valign="top">exclude</td></tr>
 * <tr><td valign="top">repeatHeaders</td><td valign="top">setRepeatHeaders</td></tr>
 * <tr><td valign="top">cssRowCellOdd</td><td valign="top">setCssOddRow</td></tr>
 * <tr><td valign="top">cssRowCellEven</td><td valign="top">setCssEvenRow</td></tr>
 * <tr><td valign="top">cssFunc</td><td valign="top">setCssFunction</td></tr>
 * <tr><td valign="top">emptyTable</td><td valign="top">setEmptyTable</td></tr>
 * <tr><td valign="top">rowPadding</td><td valign="top">setRowPadding</td></tr>
 * <tr><td valign="top">rowVerticalBorder</td><td valign="top">setRowVerticalBorder</td></tr>
 * <tr><td valign="top">rowHorizontalBorder</td><td valign="top">setRowHorizontalBorder</td></tr>
 * <tr><td valign="top">headerVerticalBorder</td><td valign="top">setHeaderVerticalBorder</td></tr>
 * <tr><td valign="top">subTotalVerticalBorder</td><td valign="top">setSubTotalVerticalBorder</td></tr>
 * <tr><td valign="top">grandTotalVerticalBorder</td><td valign="top">setGrandTotalVerticalBorder</td></tr>
 * <tr><td valign="top">columns</td><td valign="top">setColumns</td></tr>
 * <tr><td valign="top">rowMultiplier</td><td valign="top">setRowMultiplier</td></tr>
 * </table>
 *
 * @description Constructor for ns.TableSearch class.
 * Required.
 * @constructor
 * @param {Object} options Option object.
 * @param {string} searchRecType NetSuite record type.
 * @param {number|string} searchId NetSuite saved search id.
 * @param {Array} searchFilters Array of NetSuite filter object (nlobjSearchFilter).
 * @param {Array} searchColumns Array of NetSuite column object (nlobjSearchColumn).
 * @return {ns.TableSearch} New TableSearch object
 */
ns.TableSearch = function(options, searchRecType, searchId, searchFilters, searchColumns){
    this._class = {
        table: 'plainTable',
        spacerCell: 'plainSpacerCell',
        hdrCell: 'plainHdrCell',
        hdrText: 'plainHdrText',
        rowCell: 'plainRowCell',
        rowText: 'plainRowText',
        subTotalCell: 'plainSubTotalCell',
        subTotalText: 'plainSubTotalText',
        grandTotalCell: 'plainGrandTotalCell',
        grandTotalText: 'plainGrandTotalText'
    };
    this._gridMode = false;
    this._border = '0.75pt solid black;';
    this._columnDrivenMode = false;
    this._rowFunc = null;
    this._preFunc = null;
    this._postFunc = null;
    this._headerFunc = null;
    this._subTotalFunc = null;
    this._grandTotalFunc = null;
    this._grandTotal = {
        title: 'Grand Total',
        colspan: 'auto',
        align: 'left'
    };
    this._subTotal = {
        title: 'Sub Total for {group}',
        colspan: 'auto',
        align: 'left'
    };
    this._exclude = null; //array of column indices [ 1,2,3 ]
    this._repeatHeaders = true;
    this._cssRowCellOdd = null;
    this._cssRowCellEven = null;
    this._cssFunc = null;
    this._emptyTable = null;
    this._rowPadding = 0;
    this._rowVerticalBorder = true;
    this._rowHorizontalBorder = true;
    this._headerVerticalBorder = true;
    this._subTotalVerticalBorder = true;
    this._grandTotalVerticalBorder = true;
    this._columns = null; //array of column objects
    this._searchRecType = searchRecType;
    this._searchId = searchId;
    this._searchFilters = searchFilters;
    this._searchColumns = searchColumns;
    this._rowMultiplier = 1;
    for(var opt in options) {
        if (opt == 'cssPrefix') {
            this.setCssPrefix(options[opt]);
        } else {
            this['_' + opt] = options[opt];
        }
    }
    //internal
    this._lastGroup = '';
    this._group = null;
    this._aGrandTotals = null;
    this._islastCellSpacer = false;
    /**
     * @constant
     * @public
     */
    this.ROW_DATA = 0;
    /**
     * @constant
     * @public
     */
    this.ROW_HEADER = 1;
    /**
     * @constant
     * @public
     */
    this.ROW_SUBTOTAL = 2;
    /**
     * @constant
     * @public
     */
    this.ROW_GRANDTOTAL = 3;
    return this;
}

/**
 * Set the minimum number of rows
 * @param {number} rowPadding
 * @return {ns.TableSearch} Current TableSearch object
 */
ns.TableSearch.prototype.setRowPadding = function(rowPadding){
    this._rowPadding = rowPadding;
    return this;
};

/**
 * Used in conjuction with rowPadding, the multiplier value will be the average size of a line (due to text wrapping) by default is 1 line.
 * @param {Object} rowMultiplier
 */
ns.TableSearch.prototype.setRowMultiplier = function(rowMultiplier){
    this._rowMultiplier = rowMultiplier;
    return this;
};

/**
 * Toogle the inner vertical border for row data. Default is true.
 * @param {boolean} showBorder
 * @return {ns.TableSearch} Current TableSearch object
 */
ns.TableSearch.prototype.setRowVerticalBorder = function(showBorder){
    this._rowVerticalBorder = showBorder;
    return this;
};

/**
 * Toogle the inner horizontal border for row data and subtotal. Default is true.
 * @param {boolean} showBorder
 * @return {ns.TableSearch} Current TableSearch object
 */
ns.TableSearch.prototype.setRowHorizontalBorder = function(showBorder){
    this._rowHorizontalBorder = showBorder;
    return this;
};

/**
 * Toogle the inner vertical border for header row. Default is true.
 * @param {boolean} showBorder
 * @return {ns.TableSearch} Current TableSearch object
 */
ns.TableSearch.prototype.setHeaderVerticalBorder = function(showBorder){
    this._headerVerticalBorder = showBorder;
    return this;
};

/**
 * Toogle the inner vertical border for sub total. Default is true.
 * @param {boolean} showBorder
 * @return {ns.TableSearch} Current TableSearch object
 */
ns.TableSearch.prototype.setSubTotalVerticalBorder = function(showBorder){
    this._subTotalVerticalBorder = showBorder;
    return this;
};

/**
 * Toogle the inner vertical border for Grand Total. Default is true.
 * @param {boolean} showBorder
 * @return {ns.TableSearch} Current TableSearch object
 */
ns.TableSearch.prototype.setGrandTotalVerticalBorder = function(showBorder){
    this._grandTotalVerticalBorder = showBorder;
    return this;
};

/**
 * Set the HTML to display when there is no result from search.
 * @param {string} htmlText
 * @return {ns.TableSearch} Current TableSearch object
 */
ns.TableSearch.prototype.setEmptyTable = function(htmlText){
    this._emptyTable = htmlText;
    return this;
};

/**
 * Specify a function to return the css class name.
 * @param cssFunction
 * @return {ns.TableSearch} Current TableSearch object
 */
ns.TableSearch.prototype.setCssFunction = function(cssFunction){
    this._cssFunc = cssFunction;
    return this;
};

/**
 * Turn off repetition of headers in succeeding pages.
 * @param {boolean} repeatHeaders True to repeat headers, otherwise false. Default is true.
 * @return {ns.TableSearch} Current TableSearch object
 */
ns.TableSearch.prototype.setRepeatHeaders = function(repeatHeaders){
    this._repeatHeaders = repeatHeaders;
    return this;
};

/**
 * Specify the odd row css. This is used for alternating odd and even backgrounds for data rows.
 * Not recommended for use with totals since the row count will differ.
 * @param {string} oddRowCss Additional css to supplement the current TD css. (e.g. "background-color: #E0E0E0;")
 * @return {ns.TableSearch} Current TableSearch object
 */
ns.TableSearch.prototype.setCssOddRow = function(oddRowCss){
    this._cssRowCellOdd = (oddRowCss==null) ? null : ns.addLastChar(oddRowCss,';');;
    return this;
};

/**
 * Specify the even row css. This is used for alternating odd and even backgrounds for data rows.
 * Not recommended for use with totals since the row count will differ.
 * @param {string} evenRowCss Additional css to supplement the current TD css. (e.g. "background-color: #E0E0E0;")
 * @return {ns.TableSearch} Current TableSearch object
 */
ns.TableSearch.prototype.setCssEvenRow = function(evenRowCss){
    this._cssRowCellEven = (evenRowCss==null) ? null : ns.addLastChar(evenRowCss,';');;
    return this;
};

/**
 * Function to return a row template for irregular table rows (e.g. column spans, row spans).
 * Usually used with TableSearch.setHeaderFunction in order to be able to create irregular header.
 * rowOffset starts from zero.
 * Does not work with other settings that control the table styles
 * since you are technically overriding the default settings. Best to use formatting available in TableWiki.
 * You can use this function for filtering rows that should not be displayed by returning an empty array
 * or return multiple rows using a TableWiki object as needed.
 * <pre> rowFunc(arrColumnsAttributes, rowOffset, record, values);
 * //arrColumnsAttributes = Column info array for this TableSearch
 * //rowOffset = Row count, starts from zero
 * //record = NetSuite record object (for current row)
 * //values = Array of column values that are to be displayed for this row
 * </pre>
 * @param {function(Array,number,Object,Array):string|function(Array,number,Object,Array):ns.TableWiki} rowFunction Function to return a string or TableWiki with numeric tokens (e.g. {0}, {1}) that represent the values of the visible columns in their order (starting from zero}.
 * @return {ns.TableSearch} Current TableSearch object
 */
ns.TableSearch.prototype.setRowFunction = function(rowFunction){
    this._rowFunc = rowFunction;
    return this;
};

/**
 * Specify a function that will be called before each row is added and can return additional
 * Table Row HTML as needed. rowOffset starts from zero.
 * <pre> preFunc(arrColumnsAttributes, rowOffset, rowType); </pre>
 * @param {function(Array,number,number):string|function(Array,number,number):ns.TableWiki} preFunction Pre function to optionally return additional rows before each row add.
 * @return {ns.TableSearch} Current TableSearch object
 */
ns.TableSearch.prototype.setPreFunction = function(preFunction){
    this._preFunc = preFunction;
    return this;
};

/**
 * Specify a function that will be called after each row is added and can return additional
 * Table Row HTML as needed. rowOffset starts from zero.
 * <pre> postFunc(arrColumnsAttributes, rowOffset, rowType); </pre>
 * @param {function(Array,number,number):string|function(Array,number,number):ns.TableWiki} postFunction Post function to optionally return additional rows after each row add.
 * @return {ns.TableSearch} Current TableSearch object
 */
ns.TableSearch.prototype.setPostFunction = function(postFunction){
    this._postFunc = postFunction;
    return this;
};

/**
 * Specify a function to return the header HTML row.
 * Optional. This is used when header has merged cells and/or multiple rows.
 * Function parameter: array of visible column attributes
 * <pre> headerFunc(arrColumnAttributes); </pre>
 * @param {function(Array):string|function(Array):ns.TableWiki} headerFunction Function to return header HTML row.
 * @return {ns.TableSearch} Current TableSearch object
 */
ns.TableSearch.prototype.setHeaderFunction = function(headerFunction){
    this._headerFunc = headerFunction;
    return this;
};

/**
 * Specify a function to return the sub total HTML row.
 * Optional. This is used to custom format the sub total row.
 * Function parameters: array of subtotal, array of column attributes, array of previous row values
 * <pre> subTotalFunc(aSubTotals,arrColumnAttributes,arrPreviousValues); </pre>
 * @param {function(Array,Array,Array):string|function(Array,Array,Array):ns.TableWiki} subTotalFunction Function to return sub total HTML row.
 * @return {ns.TableSearch} Current TableSearch object
 */
ns.TableSearch.prototype.setSubTotalFunction = function(subTotalFunction){
    this._subTotalFunc = subTotalFunction;
    return this;
};

/**
 * Specify a function to return the grand total HTML row.
 * Optional. This is used to custom format the grand total row.
 * Function parameters: grand total array, array of column attributes
 * <pre> grandTotalFunc(arrGrandTotals,arrColumnsAttributes); </pre>
 * @param {function(Array,Array):string|function(Array,Array):ns.TableWiki} grandTotalFunction Function to return grand total HTML.
 * @return {ns.TableSearch} Current TableSearch object
 */
ns.TableSearch.prototype.setGrandTotalFunction = function(grandTotalFunction){
    this._grandTotalFunc = grandTotalFunction;
    return this;
};

/**
 * Set default grand total parameter
 * @param {string} title Title for grand total. Default is "Grand Total"
 * @param {string|number} colspan Colspan 'auto' or number of columns from left to combine
 * @param {string} align Alignment of title within table cell
 * @return {ns.TableSearch} Current TableSearch object
 */
ns.TableSearch.prototype.setGrandTotal = function(title, colspan, align) {
    this._grandTotal = {
        title: title,
        colspan: colspan,
        align: align
    };
    return this;
};

/**
 * Set default sub total parameter
 * @param {string} title Title for sub total. Default is "Sub Total for {group}". {group} is replaced with the last value from sub total group on column.
 * @param {string|number} colspan Colspan 'auto' or number of columns from left to combine
 * @param {string} align Alignment of title within table cell
 * @return {ns.TableSearch} Current TableSearch object
 */
ns.TableSearch.prototype.setSubTotal = function(title, colspan, align) {
    this._subTotal = {
        title: title,
        colspan: colspan,
        align: align
    };
    return this;
};

/**
 * Specify a single or an array of indexes (based on saved search) to exclude (do not display).
 * Index starts at 0.
 * Optional.
 * @param {number|string|Array} arrColumnNames arrColumnNames is either single number/name or array of numbers/names (index starts at 0).
 * @return {ns.TableSearch} Current TableSearch object
 */
ns.TableSearch.prototype.exclude = function(arrColumnNames) {
    if (ns.isNotAssigned(this._exclude)) {
        this._exclude = [];
    }
    if (typeof arrColumnNames=='object' && arrColumnNames instanceof Array) {
        this._exclude = this._exclude.concat(arrColumnNames);
    } else { //string or number
        this._exclude.push(arrColumnNames);
    }
    return this;
};

/**
 * Specify an array of column attributes.
 * @param {Array} aColumns Array of column attributes.
 * For saved search mode (default), the columns specified in the saved search are displayed in order (unless
 *       excluded). Column attributes only supplement the information from the saved search
 *       and order here is not important.
 * For column driven mode (use TableSeach.useColumnDrivenMode) , the array of column attributes dictates which columns are displayed and in what order.
 * @return {ns.TableSearch} Current TableSearch object
 * @see ns.TableSearch.prototype.exclude
 * @see ns.TableSearch.prototype.useColumnDrivenMode
 */
ns.TableSearch.prototype.setColumns = function(aColumns) {
    this._columns = aColumns;
    return this;
};

/**
 * Use column array driven mode.
 * @return {ns.TableSearch} Current TableSearch object
 */
ns.TableSearch.prototype.useColumnDrivenMode = function() {
    this._columnDrivenMode = true;
    return this;
};

/**
 * Specify a set of CSS classes. Naming convention for group of CSS is to have similar suffixes,
 * only the prefix is different.
 * @param {string} prefix Prefix for set of CSS class names.
 * @return {ns.TableSearch} Current TableSearch object
 */
ns.TableSearch.prototype.setCssPrefix = function(prefix) {
    this._class.table = prefix + 'Table';
    this._class.spacerCell = prefix + 'SpacerCell';
    this._class.hdrCell = prefix + 'HdrCell';
    this._class.hdrText = prefix + 'HdrText';
    this._class.subTotalCell = prefix + 'SubTotalCell';
    this._class.subTotalText = prefix + 'SubTotalText';
    this._class.grandTotalCell= prefix + 'GrandTotalCell';
    this._class.grandTotalText= prefix + 'GrandTotalText';
    this._class.rowCell= prefix + 'RowCell';
    this._class.rowText= prefix + 'RowText';
    return this;
};

/**
 * Use grid mode (default border style). TableSearch will build up the borders per cell in order to be able to handle spacer columns.
 * The CSS definitions must not have border definitions.
 * @return {ns.TableSearch} Current TableSearch object
 */
ns.TableSearch.prototype.useGridMode = function() {
    this._gridMode = true;
    return this;
};

/**
 * Use grid mode (set custom border style). TableSearch will build up the borders per cell in order to be able to handle spacer columns.
 * The CSS definitions must not have border definitions.
 * @param border {string} Border attributes (e.g. "0.5pt solid black;")
 * @return {ns.TableSearch} Current TableSearch object
 */
ns.TableSearch.prototype.setBorder = function(border) {
    this._border = (border==null) ? null : ns.addLastChar(border,';');
    return this;
};

/**
 * Internal function. Check if column (by name and by index) is included or not.
 * @param {null|number|string} index
 * @param {null|string} name
 */
ns.TableSearch.prototype._canProcess = function(index, name) {
    if (ns.isNotAssigned(this._exclude)) {
        return true;
    } else if (index==null && name!=null) {
        return !ns.arrayContains(this._exclude, name);
    } else if (index!=null && name==null) {
        return !ns.arrayContains(this._exclude, index);
    } else {
        return (!ns.arrayContains(this._exclude, index) && !ns.arrayContains(this._exclude, name));
    }
};

/**
 * Internal function. Get column attribute by name or index.
 * @param {number|string} index
 * @param {string} name
 */
ns.TableSearch.prototype._getColumnAttr = function(index, name) {
    if (ns.isAssigned(this._columns)) {
        var columnByIndex = null,
            columnByName = null,
            len = this._columns.length;
        for(var i=0; i<len; i++) {
            if (index!=null && this._columns[i].name==index) {
                columnByIndex = this._columns[i];
            } else
            if (name!=null && this._columns[i].name==name) {
                columnByName = this._columns[i];
            }
        }
        //numbered columns have priority over named columns
        if (ns.isAssigned(columnByIndex)) {
            return columnByIndex;
        } else if (ns.isAssigned(columnByName)) {
            return columnByName;
        }
    }
    return {};
};

/**
 * Internal function. Count number of empty values in the array starting at specified position.
 * @param {Array} columns Column attributes
 * @param {Array} arr Array to check for empty values
 * @param {number=} pos Starting position. Optional, default to 0.
 * @return {number} Number of empty places
 */
ns.TableSearch.prototype._countEmptyPlaces = function(columns, arr, pos) {
    var start = (pos) ? pos : 0,
        ctr = 0, len = arr.length;
    for(var i=start; i<len; i++) {
        if (ns.isAssigned(arr[i]) || columns[i].spacer===true) {
            ctr = (i-1);
            break;
        }
    }
    return ctr;
};

/**
 * Internal function. Set the default formatter is none is specified.
 * @param {string} attr
 */
ns.TableSearch.prototype._setDefaultAttributes = function(attr) {
    if (ns.isNotAssigned(attr.formatter)) {
        attr.formatter = ns.formatter._getDefaultFormatter(attr._column.type, attr._column.name);
    }
    attr.grandTotal = (attr.grandTotal!=undefined && attr.grandTotal===true);
    attr.nullText = (attr.nullText==undefined) ? '' : attr.nullText;
    attr.html = (attr.html!=undefined && attr.html===true);
    attr.spacer = (attr.spacer!=undefined && attr.spacer===true);
    attr._isDummy = ((attr.name.toString()).indexOf('_')==0);
    attr._hasShow = ns.isAssigned(attr.show);
    attr._hasFunc = ns.isAssigned(attr.func);
    attr._hasAlign = ns.isAssigned(attr.align);
    if (attr.spacer) {
        attr.rowCellCss = ns.nvl(attr.rowCellCss, this._class.spacerCell);
        attr.hdrCellCss = ns.nvl(attr.hdrCellCss, this._class.spacerCell);
    } else {
        attr.rowCellCss = ns.nvl(attr.rowCellCss, this._class.rowCell);
        attr.hdrCellCss = ns.nvl(attr.hdrCellCss, this._class.hdrCell);
    }
    attr.rowTextCss = ns.nvl(attr.rowTextCss, this._class.rowText);
    attr.hdrTextCss = ns.nvl(attr.hdrTextCss, this._class.hdrText);
};

/**
 * Internal Function.
 * @param {string} attr
 * @param {number} row
 * @param {number} col
 * @param {number} rowMax
 * @param {number} colMax
 * @param {number} rowType
 * @return {Array} CSS
 */
ns.TableSearch.prototype._getCellCss = function(attr, row, col, rowMax, colMax, rowType) {
    if (ns.isAssigned(this._cssFunc)) {
        return this._cssFunc(attr, row, col, rowMax, colMax, rowType);
    } else {
        var css = [],
            style = [];
        if (rowType==this.ROW_HEADER) {
            if (ns.isAssigned(attr.width)) {
                css.push(' width="');
                css.push(attr.width);
                css.push('"');
            }
        }
        css.push(' class="');
        if (attr.spacer) {
            css.push((rowType==this.ROW_HEADER)?attr.hdrCellCss:attr.rowCellCss);
            if (this._gridMode) {
                style.push('border-left: ');
                style.push(this._border);
            }
            this._islastCellSpacer = true;
        } else {
            if (rowType==this.ROW_DATA) {
                css.push(attr.rowCellCss);
            } else if (rowType==this.ROW_HEADER) {
                css.push(attr.hdrCellCss);
            } else if (rowType==this.ROW_SUBTOTAL) {
                css.push(this._class.subTotalCell);
            } else if (rowType==this.ROW_GRANDTOTAL) {
                css.push(this._class.grandTotalCell);
            }
            if (this._gridMode) {
                if ((col==0) || (this._islastCellSpacer) ||
                    (this._rowVerticalBorder && rowType==this.ROW_DATA) ||
                    (this._headerVerticalBorder && rowType==this.ROW_HEADER) ||
                    (this._subTotalVerticalBorder && rowType==this.ROW_SUBTOTAL) ||
                    (this._grandTotalVerticalBorder && rowType==this.ROW_GRANDTOTAL)) {
                    style.push(' border-left: ');
                    style.push(this._border);
                }
                if (col==(colMax-1)) {
                    style.push(' border-right: ');
                    style.push(this._border);
                }
                if (rowType==this.ROW_HEADER) {
                    style.push('border-top: ');
                    style.push(this._border);
                }
                if ((row==(rowMax-1)) ||
                    (rowType==this.ROW_HEADER) ||
                    (rowType==this.ROW_GRANDTOTAL) ||
                    (this._rowHorizontalBorder && (rowType==this.ROW_DATA || rowType==this.ROW_SUBTOTAL)) ) {
                    style.push('border-bottom: ');
                    style.push(this._border);
                }
            }
            if (rowType!=this.ROW_HEADER) {
                var isOddRow = ((row%2)==0); //zero index
                if (isOddRow && this._cssRowCellOdd!=null) {
                    style.push(this._cssRowCellOdd);
                } else if (!isOddRow && this._cssRowCellEven!=null) {
                    style.push(this._cssRowCellEven);
                }
            }
            this._islastCellSpacer = false;
        }
        css.push('"');
        if (style.length>0) {
            css.push(' style="');
            css = css.concat(style);
            css.push('"');
        }
        /*
        //check if attr.colspan is set from custom function
        if (rowType == this.ROW_DATA && attr.colSpan && attr.colSpan>1) {
            css.push(' colspan="');
            css.push(attr.colSpan);
            css.push('"');
        }
        */
        return css;
    }
};

/**
 * Specify saved search to use. Parameters same as for nlapiSearchRecord.
 * Required.
 * @param {string} searchRecType
 * @param {string} searchId
 * @param {Array} searchFilters
 * @param {Array} searchColumns
 * @return {ns.TableSearch} Current TableSearch object
 */
ns.TableSearch.prototype.setSearch = function(searchRecType, searchId, searchFilters, searchColumns){
    this._searchRecType = searchRecType;
    this._searchId = searchId;
    this._searchFilters = searchFilters;
    this._searchColumns = searchColumns;
    return this;
};

/**
 * Internal function. Get HTML for sub total.
 * @param {Array} htmlArray
 * @param {Array} subTotals
 * @param {Array} columns
 * @param {Array} previousValues
 * @param {number} currentRow
 * @param {number} rowMax
 * @param {number} colMax
 */
ns.TableSearch.prototype._getSubTotal = function(htmlArray, subTotals,columns,previousValues, currentRow, rowMax, colMax) {
    htmlArray.push('<tr>');
    var colspan = (this._subTotal.colspan=='auto') ? this._countEmptyPlaces(columns, subTotals, 0) : parseInt(this._subTotal.colspan,10);
    for(var i=colspan; i<colMax; i++) {
        var attr = columns[i],
            isTitleCell = (colspan>=0 && i==colspan);
        htmlArray.push('<td');
        this._appendArray(htmlArray, this._getCellCss(attr, currentRow-1, i, rowMax, colMax, this.ROW_SUBTOTAL));
        htmlArray.push(isTitleCell ? ' colspan="' + (colspan+1) + '"' : '');
        htmlArray.push('><p class="');
        htmlArray.push(this._class.subTotalText);
        htmlArray.push('" ');
        if (isTitleCell) {
            htmlArray.push('style="text-align: ');
            htmlArray.push(ns.nvl(this._subTotal.align, 'right'));
            htmlArray.push('" ');
        } else if (!attr._hasAlign) {
            htmlArray.push('style="text-align: right" ');
        } else if (attr._hasAlign) {
            htmlArray.push('style="text-align: ');
            htmlArray.push(attr.align);
            htmlArray.push('" ');
        }
        htmlArray.push('>');
        if (attr.grandTotal ||  ns.isAssigned(attr.subTotalGroup)) {
            htmlArray.push((attr.formatter) ? attr.formatter(subTotals[i]) : subTotals[i]);
        } else if (isTitleCell) {
            var title = this._subTotal.title.replace(/{group}/g, ((this._lastGroup)?this._lastGroup:''));
            htmlArray.push(ns.isAssigned(this._subTotal.title) ? title : '');
        }
        htmlArray.push('</p></td>');
    }
    htmlArray.push('</tr>');
};

/**
 * Internal function. Get HTML for grand total.
 * @param {Array} htmlArray
 * @param {Array} grandTotals
 * @param {Array} columns
 * @param {number} currentRow
 * @param {number} rowMax
 * @param {number} colMax
 */
ns.TableSearch.prototype._getGrandTotal = function(htmlArray, grandTotals,columns, currentRow, rowMax, colMax) {
    htmlArray.push('<tr>');
    var colspan = (this._grandTotal.colspan=='auto') ? this._countEmptyPlaces(columns, grandTotals, 0) : parseInt(this._grandTotal.colspan,10);
    for(var i=0; i<colMax; i++) {
       if (i >= colspan) {
           var attr = columns[i];
           var isTitleCell = (colspan>=0 && i==colspan);
           htmlArray.push('<td');
           this._appendArray(htmlArray, this._getCellCss(attr, currentRow, i, rowMax, colMax, this.ROW_GRANDTOTAL));
           htmlArray.push(isTitleCell ? ' colspan="' + (colspan+1) + '"' : '');
           htmlArray.push('><p class="');
           htmlArray.push(this._class.grandTotalText);
           htmlArray.push('" ');
           if (isTitleCell) {
               htmlArray.push('style="text-align: ');
               htmlArray.push(ns.nvl(this._grandTotal.align, 'right'));
               htmlArray.push('" ');
           } else if (!attr._hasAlign) {
               htmlArray.push('style="text-align: right" ');
           } else if (attr._hasAlign) {
                  htmlArray.push('style="text-align: ');
                  htmlArray.push(attr.align);
                  htmlArray.push('" ');
           }
           //this._setDefaultFormatter(attr, grandTotals[i]);
           htmlArray.push('>');
           if (attr.grandTotal) {
               htmlArray.push(ns.isAssigned(attr.formatter) ? attr.formatter(grandTotals[i]) : grandTotals[i]);
           } else if (isTitleCell) {
               htmlArray.push(ns.nvl(this._grandTotal.title, ''));
           }
           htmlArray.push('</p></td>');
       }
    }
    htmlArray.push('</tr>');
};

/**
 * Internal function.
 * @param {Array} htmlArray
 * @param {string|ns.TableWiki|Array} itemToAdd
 */
ns.TableSearch.prototype._appendArray = function(htmlArray, itemToAdd) {
    if (typeof itemToAdd=='object') {
        if (itemToAdd instanceof Array) {
            //htmlArray = htmlArray.concat(itemToAdd); //this will not work
            for(var i=0;i<itemToAdd.length;i++) {
                htmlArray.push(itemToAdd[i]);
            }
        } else if (itemToAdd instanceof ns.TableWiki) {
            htmlArray.push(itemToAdd.getHtml(true));
        } else {
            htmlArray.push(itemToAdd);
        }
    } else {
        htmlArray.push(itemToAdd);
    }
};

/**
 * Internal function
 * @param {Array} htmlArray
 * @param {Array} columns
 * @param {number} currentRow
 * @param {number} rowType
 */
ns.TableSearch.prototype._preFunctionResult = function(htmlArray, columns, currentRow, rowType){
    if (this._preFunc != null) {
        var rowHtml = this._preFunc(columns, currentRow, rowType);
        if (rowHtml != null) {
            this._appendArray(htmlArray, rowHtml);
            return 1;
        }
    }
    return 0;
};

/**
 * Internal function
 * @param {Array} htmlArray
 * @param {Array} columns
 * @param {number} currentRow
 * @param {number} rowType
 */
ns.TableSearch.prototype._postFunctionResult = function(htmlArray, columns, currentRow, rowType){
    if (this._postFunc != null) {
        var rowHtml = this._postFunc(columns, currentRow, rowType);
        if (rowHtml != null) {
            this._appendArray(htmlArray, rowHtml);
            return 1;
        }
    }
    return 0;
};

/**
 * Internal function.
 * @param {Object} htmlArray
 * @param {Object} columns
 * @param {Object} rowMax
 * @param {Object} colMax
 */
ns.TableSearch.prototype._defaultHeader = function(htmlArray, columns, rowMax, colMax) {
    htmlArray.push('<tr>');
    for (var i = 0; i < colMax; i++) {
        var attr = columns[i];
        htmlArray.push('<td');
        this._appendArray(htmlArray, this._getCellCss(attr, -1, i, rowMax, colMax, this.ROW_HEADER));
        htmlArray.push('>');
        if (!attr.spacer) {
            var headerTitle = null;
            if (ns.isAssigned(attr.title)) {
                headerTitle = attr.title;
            } else {
                headerTitle = ns.formatter.titleCase( ns.nvl(attr._column.label, attr._column.name) );
            }
            if (ns.isNotEmpty(headerTitle)) {
                htmlArray.push('<p class="');
                htmlArray.push(attr.hdrTextCss);
                htmlArray.push('">' );
                htmlArray.push(headerTitle);
                htmlArray.push('</p>');
            }
        }
        htmlArray.push('</td>');
    }
    htmlArray.push('</tr>');
};

/**
 * Internal function.
 * @param {Object} htmlArray
 * @param {Object} columns
 * @param {Object} currentRow
 * @param {Object} rowMax
 * @param {Object} colMax
 */
ns.TableSearch.prototype._addEmptyRows = function(htmlArray, columns, currentRow, rowMax, colMax) {
    htmlArray.push('<tr>');
    for(var i=0; i<colMax; i++) {
        var attr = columns[i];
        htmlArray.push('<td');
        this._appendArray(htmlArray, this._getCellCss(attr, currentRow, i, rowMax, colMax, this.ROW_DATA));
        htmlArray.push('>&#160;</td>');
    }
    htmlArray.push('</tr>');
};

/**
 * Internal fnuction.
 * @param {Object} record
 * @param {Object} columns
 * @param {Object} subTotalGroup
 * @param {Object} debugInfo
 */
ns.TableSearch.prototype._setupVisibleColumns = function(record, columns, subTotalGroup, debugInfo) {
     var aColumns = record.getAllColumns(),
         hasGrandTotal = false,
         columnsCount = (this._columnDrivenMode) ? this._columns.length : aColumns.length;
     //prepare visible columns, done once only
     if (!this._columnDrivenMode) {
         for (var i = 0; i < columnsCount; i++) {
             var col = aColumns[i];
             if (this._canProcess(i, col.name)) {
                 var attr = this._getColumnAttr(i, col.name);
                 attr.name = col.name;
                 attr._index = i;
                 attr._column = col;
                 debugInfo.push(' name:'+col.name+', index:'+i+'\n');
                 this._setDefaultAttributes(attr);
                 columns.push(attr);
                 if (attr._isDummy && !attr.spacer && !attr._hasFunc) {
                     throw nlapiCreateError('MISSING_FUNCTION','TableSearch: Missing custom function "func" for column '+attr._column.name);
                 }
                 if (ns.isNotEmpty(attr.subTotalGroup)) {
                     subTotalGroup.push(attr.subTotalGroup);
                 }
                 if (attr.grandTotal) {
                     hasGrandTotal = true;
                 }
             }
         }
     } else {
         for (var i=0; i<columnsCount; i++) {
             var colName = this._columns[i].name;
             if (ns.isNotAssigned(colName)) {
                 throw nlapiCreateError('MISSING_COLUMN_NAME', 'TableSearch: Missing column name. index='+i);
             }
             var attr = this._columns[i],
                 col = null,
                 index = null;
             if ((attr.name.toString()).indexOf('_')==0) {
                 col = { name : colName, type : ((attr.type) ? attr.type : 'text') };
             } else if (!isNaN(colName)){
                 index = parseInt(colName, 10);
                 if (index >= aColumns.length) {
                     throw nlapiCreateError('INVALID_COLUMN_INDEX', 'TableSearch: Invalid column index: '+colName);
                 }
                 col = aColumns[index];
             } else {
                 var j = 0;
                 for(var c in aColumns) {
                     if (aColumns[c].name==colName) {
                         col = aColumns[c];
                         index = j;
                         break;
                     }
                     j++;
                 }
             }
             if (ns.isNotAssigned(col)) {
                 throw nlapiCreateError('INVALID_COLUMN_NAME', 'TableSearch: Invalid column name: '+colName);
             }
             if (this._canProcess(index, colName)) {
                 attr._index = index;
                 attr._column = col;
                 debugInfo.push(' name:'+colName+', index:'+index+'\n');
                 this._setDefaultAttributes(attr);
                 columns.push(attr);
                 if (attr._isDummy && !attr.spacer && !attr._hasFunc) {
                     throw nlapiCreateError('MISSING_CUSTOM_FUNCTION','TableSearch: Missing custom function "func" for column '+attr._column.name);
                 }
                 if (ns.isNotEmpty(attr.subTotalGroup)) {
                     subTotalGroup.push(attr.subTotalGroup);
                 }
                 if  (attr.grandTotal) {
                     hasGrandTotal = true;
                 }
             }
         } //for
     }
     return hasGrandTotal;
};

ns.TableSearch.prototype._getRowData = function(record, lastValues, columns, currentRow, rowMax, colMax) {
    var tblItem = null;
    var cellValues = [];
    for (var i = 0; i < colMax; i++) {
		//broken as of 1/17/2012
        //var attr = columns[i], value = lastValues[i], cellValue = null, isImage = (attr._column.type == 'select' && value && (value instanceof String) && value.indexOf('/core/media/media.nl?') == 0);
		var attr = columns[i], value = lastValues[i], cellValue = null, isImage = (attr._column.type == 'select' && value && (value.indexOf != null) && value.indexOf('/core/media/media.nl?') == 0);
        if (ns.isEmpty(value)) {
            cellValue = attr.nullText;
        } else if (value == '&nbsp;') { //handle weird result,looks like ns bug
            cellValue = '&#160;';
        } else if (attr.html) {
            cellValue = ns.formatter.htmlToXml(cellValue);
        } else if (isImage) {
            //img HTML tag or HTML fragment
            cellValue = (attr.dpi != undefined && attr.formatter == ns.formatter.image) ? ns.formatter.image(value, attr.dpi) : attr.formatter(value);
        } else {
            cellValue = ns.formatter.stringToXml(((attr.formatter) ? attr.formatter(value) : value));
        }
        cellValues.push(cellValue);
    }
    if (this._rowFunc == null) {
        tblItem = ['<tr>'];
        for (var i = 0; i < colMax; i++) {
            var attr = columns[i], value = lastValues[i];
            tblItem.push('<td'); 
            tblItem = tblItem.concat(this._getCellCss(attr, currentRow, i, rowMax, colMax, this.ROW_DATA));
            tblItem.push('>');
            if (!attr.spacer) {
                if (ns.isNotEmpty(cellValues[i])) {
                    tblItem.push('<p class="');
                    tblItem.push(attr.rowTextCss);
                    tblItem.push('" ');
                    var isImage = (attr._column.type == 'select' && value && value.indexOf('/core/media/media.nl?') == 0);
                    if (!attr._hasAlign && isImage) {
                        tblItem.push('align="center" style="text-align: center;display: block" '); //center image not working yet
                    } else if (!attr._hasAlign && !isNaN(lastValues[i])) {
                        tblItem.push('style="text-align: right" ');
                    } else if (attr._hasAlign) {
                        tblItem.push('style="text-align: ' + attr.align + '" ');
                    }
                    tblItem.push('>');
                    tblItem.push(cellValues[i]);
                    tblItem.push('</p>');
                }
            }
            tblItem.push('</td>');
        }
        tblItem.push('</tr>');
    } else if (record!=null) {
        //use row template
        var tmpl = [];
        this._appendArray(tmpl, this._rowFunc(columns, currentRow, record, cellValues));
        tblItem = [tmpl.join('').replace(/\{(.+?)\}/g, function(token, match){
            if (isNaN(match)) {
                return ns.context.get(token, true);
            } else { //if numeric, index of columns
                return cellValues[match];
            }
        })];//tblItem
    } //else
    return tblItem;
};

/**
 * Generate a HTML table based on saved search.
 * Required.
 * @return {Array|string} Array containing HTML table based on saved search.
 */
ns.TableSearch.prototype.getHtmlArray = function() {
    if (ns.isNotAssigned(this._searchRecType)) {
        throw nlapiCreateError('MISSING_SAVED_SEARCH','No saved search specified. TableSearch.setSearch must be called first.');
    }
    var aHtml = null,
        res = nlapiSearchRecord(this._searchRecType, this._searchId, this._searchFilters, this._searchColumns);
    if (res) {
        aHtml =  ['<table width="100%" class="', this._class.table ,'">'];
        var resLen = res.length,
            rowMax = Math.max(resLen * this._rowMultiplier, this._rowPadding),
            isFirstRun = true,
            hasGrandTotal = false,
            visibleColumns = [],
            visibleCount = 0,
            processSubTotal = false,
            aPreviousValues = null,
            aLastValues = null,
            aSubTotals = null,
            aSubTotalGroup = [],
            debugInfo = [],
            currentRow = 0;
        //NOTE: looping is max len+1 = to be able to compute the last subtotal
        for(var rowCount=0; rowCount<=resLen; rowCount++) {
            var isActualRec = (rowCount < resLen);
            var rec = (isActualRec) ? res[rowCount] : null;
            if (isFirstRun) {
                hasGrandTotal = this._setupVisibleColumns(rec, visibleColumns, aSubTotalGroup, debugInfo);
                visibleCount = visibleColumns.length;
                nlapiLogExecution('DEBUG', 'TableSearch: search id='+this._searchId+', total visible='+visibleCount, debugInfo.join(''));

                //process headers
                if (this._repeatHeaders===true) {
                    aHtml.push('<thead>');
                }
                //Order of priority: header function, columns, search label, search name
                if (ns.isAssigned(this._headerFunc)) {
                    //parameter: array of visible column
                    this._appendArray(aHtml,this._headerFunc(visibleColumns));
                } else {
                    this._defaultHeader(aHtml, visibleColumns, rowMax, visibleCount);
                }
                if (this._repeatHeaders===true) {
                    aHtml.push('</thead><tbody>');
                }
                aPreviousValues = new Array(visibleCount);
                aLastValues = new Array(visibleCount);
                aSubTotals = new Array(visibleCount);
                this._aGrandTotals = new Array(visibleCount);
                isFirstRun = false;
            }

            //first pass to determine value and if there is subtotal (processsubtotal)
            for(var i=0; i<visibleCount; i++) {
                var attr = visibleColumns[i];
                //if text is not null, show text, else show value
                //use attr.show=='value' to override
                var value = null;
                if (rec!=null) {
                    if (attr.rownum==true) {
                        value = rowCount+1;
                    } else if (attr.spacer) {
                        value = '';
                    } else if (attr._hasFunc || attr._isDummy) {
                        //parameters: index, column, record
                        value = attr.func(i, visibleColumns, rec);
                    } else if (attr._hasShow) {
                        value = (attr.show=='text') ? rec.getText(attr._column) : rec.getValue(attr._column);
                    }
                    else {
                        value = ns.getSearchField(rec, attr._column);
                    }
                }

                if (rowCount>0 && (ns.arrayContains(aSubTotalGroup,attr._index) ||
                        ns.arrayContains(aSubTotalGroup,attr._column.name)) && (aLastValues[i]!=value)) {
                     this._lastGroup = aLastValues[i];
                     processSubTotal = true;
                }
                if (isActualRec && (attr.grandTotal || ns.isNotEmpty(attr.subTotalGroup))) {
                    var val = (ns.isEmpty(value) || isNaN(value)) ? 0 : parseFloat(value);
                    //init array value the first time
                    if (ns.isNotAssigned(this._aGrandTotals[i])) {
                        this._aGrandTotals[i]=0;
                        aSubTotals[i]=0;
                    }
                    this._aGrandTotals[i] += val;
                    aPreviousValues[i] = aLastValues[i];
                    aLastValues[i] = val;
                } else {
                    //last value must always be set
                    aPreviousValues[i] = aLastValues[i];
                    aLastValues[i] = value;
                }
            }
            if (processSubTotal) {
                currentRow++;
            }
            //second pass to generate html
            var tblItem = this._getRowData(rec, aLastValues, visibleColumns, currentRow, rowMax, visibleCount);

            if (processSubTotal) {
                //pre func, some adjustment made to currentRow
                currentRow--;
                currentRow += this._preFunctionResult(aHtml, visibleColumns, currentRow, this.ROW_SUBTOTAL);
                currentRow++;
                //subtotal
                if (ns.isAssigned(this._subTotalFunc)) {
                    //parameters: subtotal array, array of column attributes, array of last row values
                    this._appendArray(aHtml,this._subTotalFunc(aSubTotals,visibleColumns, aPreviousValues));
                } else {
                    this._getSubTotal(aHtml, aSubTotals, visibleColumns, aPreviousValues, currentRow, resLen, visibleCount);
                }
                processSubTotal = false;
                //post func
                currentRow += this._postFunctionResult(aHtml, visibleColumns, currentRow, this.ROW_SUBTOTAL);
                //reset totals
                for(var j in aSubTotals) {
                    aSubTotals[j] = 0;
                }
            }
            //add values from last row
            for(var j in aSubTotals) {
                aSubTotals[j] += (ns.isNotAssigned(aLastValues[j]) || isNaN(aLastValues[j])) ? 0 : parseFloat(aLastValues[j]);
            }
            //add item row
            if (rowCount < resLen) {
                //pre func
                currentRow += this._preFunctionResult(aHtml, visibleColumns, currentRow, this.ROW_DATA);
                //actual row
                aHtml = aHtml.concat(tblItem);
                currentRow++;
                //post func
                currentRow += this._postFunctionResult(aHtml, visibleColumns, currentRow, this.ROW_DATA);
            }
        }
        //pad rows
        if (this._rowPadding>0) {
            for(var p=currentRow; p<this._rowPadding; p++) {
                this._addEmptyRows(aHtml, visibleColumns, currentRow, rowMax, visibleCount);
                currentRow++;
            }
        }

        //grand total
        if (hasGrandTotal) {
            //pre func
            currentRow += this._preFunctionResult(aHtml, visibleColumns, currentRow, this.ROW_GRANDTOTAL);
            //grand total
            if (ns.isAssigned(this._grandTotalFunc)) {
                //parameters: grand total array, list of column attributes
                this._appendArray(aHtml, this._grandTotalFunc(this._aGrandTotals,visibleColumns));
            } else {
                this._getGrandTotal(aHtml, this._aGrandTotals, visibleColumns, currentRow, rowMax, visibleCount);
            }
            currentRow++;
            //post func
            currentRow += this._postFunctionResult(aHtml, visibleColumns, currentRow, this.ROW_GRANDTOTAL);
        }

        if (this._repeatHeaders===true) {
            aHtml.push('</tbody>');
        }
        aHtml.push('</table>');
    }
    return (aHtml==null) ? (this._emptyTable==null ? [] : [this._emptyTable]) : aHtml;
};

/**
 * Get the grand total array. Must be called after TableSearch.getHtml is called, otherwise will be null.
 * @return {Array} Grand total array.
 */
ns.TableSearch.prototype.getGrandTotal = function() {
    return this._aGrandTotals;
};

/**
 * Generate a HTML table based on saved search.
 * Required.
 * @return {string} HTML table based on saved search.
 */
ns.TableSearch.prototype.getHtml = function(){
    return this.getHtmlArray().join('');
};

/**
 * @class PdfReport is the base class for PDF creation. It handles the page size, headers, footers, and CSS.
 * The class also handles debugging by displaying XML if exception is throw. If request object is passed to constructor,
 * specifying '&debug=true' in the URL will display XML instead of PDF. Examples of usage:
 * <br/><br/>
 * Create a pdf report and show as inline in browser.
 * <pre>var pdf = ns.PdfReport(request);
 * pdf.addCss('body { font-size: 10pt; }');
 * pdf.add('Hello, world');
 * pdf.download(response);
 * </pre>
 * Specify A4 paper size and landscape.
 * <pre>pdf.setA4(true);</pre>
 * Specify Letter paper size and portrait.
 * <pre>pdf.setLetter();</pre>
 * Specify a (next) new page.
 * <pre>pdf.newPage();</pre>
 * Specify header for all pages.
 * <pre>pdf.setHeader('&lt;p align="center"&gt;Page &lt;pagenumber/&gt; of &lt;totalpages/&gt;&lt;/p&gt;', 10);
 * </pre>
 * Specify the header for succeeding pages, first page will not have a header.
 * <pre>pdf.setHeader('&lt;p align="center"&gt;Page &lt;pagenumber/&gt; of &lt;totalpages/&gt;&lt;/p&gt;', 10, 2);
 * </pre>
 * @description Constructor for Pdf Report. If request object is passed and the parameter debug=true is passed
 * then debug mode is triggered and XML will be shown.
 * @constructor
 * @param {Object=} request Optional. NetSuite request object (nlobjRequest). Used for checking for debug parameter.
 * @return {ns.PdfReport} Current PdfReport object
 */
ns.PdfReport = function(request) {
    //constants
    this.SIZE_A4 = 'A4';
    this.SIZE_LTR = 'Letter';
    this.SIZE_LGL = 'Legal';
    this.SIZE_A4_LS = 'A4-landscape';
    this.SIZE_LTR_LS = 'Letter-landscape';
    this.SIZE_LGL_LS = 'Legal-landscape';
    //variables
    this._debugXml = (request!=undefined && request.getParameter('debug')==='true') ? true : false;
    this._filename = "file.pdf";
    this._bodyAttr = [];
    this._layout = 'single-page';
    this._size = 'A4';
    this._aContent = [];
    this._defaultPagination = '<p align="center">Page <pagenumber/> of <totalpages/></p>';
    this._headers = {};
    this._footers = {};
    this._defaultSize = 10;
    this._lang = null;
    this._link = [];
    /**
     * Predefined CSS sets.
     * Add predefined CSS sets here and it will be automatically part of the PdfReport CSS
     * Add only those that are reusable for next project.
     * Those that are project specific must be added using PdfReport.addCss();
     */
    this._style = [
    //Report Title CSS
    ".mainTitle { font-size:16pt; font-weight: bold }",
    ".subTitle  { font-size:14pt }",
    /*
     * Prefix CSS (tailored for both HTML and PDF)
     * empty-cells, border-collapse, cellspacing are HTML only, not understood by PDF engine.
     * cellborder, cellpadding, cellmargin are PDF specific.
     * Names starting with grid will automatically use border. No need to define borders in the css.
     */
    //Plain CSS
    ".plainTable   { empty-cells:show; border-collapse:collapse; border: 0px; cellborder: 0px; padding: 0px; margin: 0px; }",
    ".plainSpacerCell { width:5px; }",
    ".plainHdrCell { vertical-align:top; padding: 0px; margin: 0px;}",
    ".plainHdrText { width:100%; vertical-align:middle; }",
    ".plainRowCell { vertical-align:top; padding: 0px; margin: 0px;}",
    ".plainRowText { width:100%; vertical-align:top; text-align:left; }",
    ".plainSubTotalCell { vertical-align:top; padding: 0px; margin: 0px;}",
    ".plainSubTotalText { width:100%; vertical-align:top; text-align:right; }",
    ".plainGrandTotalCell { vertical-align:top; padding: 0px; margin: 0px;}",
    ".plainGrandTotalText { width:100%; vertical-align:top; text-align:right; }",
    //Grid CSS - must not contain border > 0
    ".gridTable   { empty-cells:show; border-collapse:collapse; border: 0px; padding: 0px; margin: 0px; }",
    ".gridSpacerCell { width:5px; }",
    ".gridHdrCell { vertical-align:top; text-align:center; padding: 2px; margin: 0px; }",
    ".gridHdrText { font-weight: bold; width:100%; vertical-align:middle; text-align:center; }",
    ".gridRowCell { vertical-align:top; padding: 2px; margin: 0px; }",
    ".gridRowText { width:100%; vertical-align:top; text-align:left; }",
    ".gridSubTotalCell { vertical-align:top; padding: 2px; margin: 0px;}",
    ".gridSubTotalText { font-weight: bold; width:100%; vertical-align:top; text-align:right; }",
    ".gridGrandTotalCell { vertical-align:top; padding: 2px; margin: 0px;}",
    ".gridGrandTotalText { font-weight: bold; width:100%; vertical-align:top; text-align:right; }",
    //Grid with black background header - must not contain border > 0
    ".gridBlackTable   { empty-cells:show; border-collapse:collapse; border: 0px; padding: 0px; margin: 0px; }",
    ".gridBlackSpacerCell { width:5px; }",
    ".gridBlackHdrCell { background-color: black; vertical-align:top; text-align:center; padding: 2px; margin: 0px; }",
    ".gridBlackHdrText { color: white; font-weight: bold; width:100%; vertical-align:middle; text-align:center; }",
    ".gridBlackRowCell { vertical-align:top; padding: 2px; margin: 0px; }",
    ".gridBlackRowText { width:100%; vertical-align:top; text-align:left; }",
    ".gridBlackSubTotalCell { vertical-align:top;  padding: 2px; margin: 0px; }",
    ".gridBlackSubTotalText { font-weight: bold; width:100%; vertical-align:top; text-align:right; }",
    ".gridBlackGrandTotalCell { vertical-align:top; padding: 2px; margin: 0px; }",
    ".gridBlackGrandTotalText { font-weight: bold; width:100%; vertical-align:top; text-align:right; }",
    //Lines CSS
    ".linesTable   { empty-cells:show; border-collapse:collapse; border: 0px; padding: 0px; margin: 0px; }",
    ".linesSpacerCell { width:5px; }",
    ".linesHdrCell { border-top: 0.5pt solid black; border-bottom: 0.5pt solid black; vertical-align:top; text-align:center;  padding: 2px; margin: 0px; }",
    ".linesHdrText { font-weight: bold; width:100%; vertical-align:middle; text-align:center; }",
    ".linesRowCell { vertical-align:top;  padding: 2px; margin: 0px; }",
    ".linesRowText { width:100%; vertical-align:top; text-align:left; }",
    ".linesSubTotalCell { border-top: 0.5pt solid black; border-bottom: 0.5pt solid black; vertical-align:top; padding: 2px; margin: 0px;}",
    ".linesSubTotalText { font-weight: bold; width:100%; vertical-align:top; text-align:right; }",
    ".linesGrandTotalCell { border-top: 1pt solid black; border-bottom: 1pt solid black; vertical-align:top; padding: 2px; margin-top: 3px;}",
    ".linesGrandTotalText { font-weight: bold; width:100%; vertical-align:top; text-align:right; }"
    ];

    return this;
}

/**
 * Set additional body tag attributes. Call only once. Second call overwrites first inde.
 * Optional.
 * @param {string} attr Attributes
 * @return {ns.PdfReport} Current PdfReport object
 */
ns.PdfReport.prototype.setBody = function(attr) {
    this._bodyAttr.push(attr);
    return this;
};

/**
 * Display output as XML.
 * Optional. For debugging purposes.
 * @param {boolean=} isDebug Optional. Default to true.
 * @return {ns.PdfReport} Current PdfReport object
 */
ns.PdfReport.prototype.debug = function(isDebug) {
    this._debugXml = ns.isAssigned(isDebug) ? isDebug : true;
    return this;
};

//paper sizes

/**
 * Set paper size to A4. Default is A4 portrait. Same as using PdfReport.setPaperSize.
 * Optional.
 * @param {boolean=} isLandscape Optional. True for landspace. False for portrait. Default is portrait.
 * @return {ns.PdfReport} Current PdfReport object
 * @see ns.PdfReport.prototype.setPaperSize
 */
ns.PdfReport.prototype.setA4 = function(isLandscape) {
    this._size = 'A4' + (ns.isTrue(isLandscape)?'-landscape':'');
    return this;
};

/**
 * Set paper size to Letter. Same as using PdfReport.setPaperSize.
 * Optional.
 * @param {boolean=} isLandscape Optional. True for landspace. False for portrait. Default is portrait.
 * @return {ns.PdfReport} Current PdfReport object
 * @see ns.PdfReport.prototype.setPaperSize
 */
ns.PdfReport.prototype.setLetter = function(isLandscape) {
    this._size = 'Letter' + (ns.isTrue(isLandscape)?'-landscape':'');
    return this;
};

/**
 * Set paper size to Legal. Same as using PdfReport.setPaperSize.
 * Optional.
 * @param {boolean=} isLandscape Optional. True for landspace. False for portrait. Default is portrait.
 * @return {ns.PdfReport} Current PdfReport object
 * @see ns.PdfReport.prototype.setPaperSize
 */
ns.PdfReport.prototype.setLegal = function(isLandscape) {
    this._size = 'Legal' + (ns.isTrue(isLandscape)?'-landscape':'');
    return this;
};

/**
 * Set paper size. Same as using PdfReport.setA4, PdfReport.setLetter or PdfReport.setLegal.
 * @param {string} paperSize Paper size for next page. Optional
 * <pre>  PdfReport.SIZE_A4       //A4
 *   PdfReport.SIZE_LTR      //Letter
 *   PdfReport.SIZE_LGL      //Legal
 *   PdfReport.SIZE_A4_LS    //A4-landscape
 *   PdfReport.SIZE_LTR_LS   //Letter-landscape
 *   PdfReport.SIZE_LGL_LS   //Legal-landscape
 * </pre>
 * @return {ns.PdfReport} Current PdfReport object
 * @see ns.PdfReport.prototype.setA4
 * @see ns.PdfReport.prototype.setLetter
 * @see ns.PdfReport.prototype.setLegal
 */
ns.PdfReport.prototype.setPaperSize = function(paperSize){
    this._size = paperSize;
    return this;
};

/**
 * Create new page and optional set page number or parameters.
 * Total pages still remains the same even if pageNumber is set,
 * so do not show total pages when you want to manually set page numbers.
 * @param {string} headerId Header Id. Optional.
 * @param {string} footerId Footer Id. Optional.
 * @param {number} pageNumber Page number for next page. Optional.
 * @param {string} paperSize Paper size for next page. Optional. (e.g. pdf.SIZE_A4)
 * <pre>  PdfReport.SIZE_A4       //A4
 *   PdfReport.SIZE_LTR      //Letter
 *   PdfReport.SIZE_LGL      //Legal
 *   PdfReport.SIZE_A4_LS    //A4-landscape
 *   PdfReport.SIZE_LTR_LS   //Letter-landscape
 *   PdfReport.SIZE_LGL_LS   //Legal-landscape
 * </pre>
 * @return {ns.PdfReport} Current PdfReport object
 */
ns.PdfReport.prototype.newPage = function(headerId, footerId, pageNumber, paperSize){
    this._aContent.push('<pbr');
    if (ns.isAssigned(headerId)) {
        var hdr = this._headers[headerId];
        if (ns.isNotAssigned(hdr)) {
            throw nlapiCreateError('UNKNOWN_HEADER_ID', 'PdfReport.newPage: header id is not defined:'+headerId);
        }
        this._aContent.push(' header="');
        this._aContent.push(headerId);
        this._aContent.push('" header-height="');
        this._aContent.push(hdr.size);
        this._aContent.push('"');
    }
    if (ns.isAssigned(footerId)) {
        var ftr = this._footers[footerId];
        if (ns.isNotAssigned(ftr)) {
            throw nlapiCreateError('UNKNOWN_FOOTER_ID', 'PdfReport.newPage: footer id is not defined:'+footerId);
        }
        this._aContent.push(' footer="');
        this._aContent.push(footerId);
        this._aContent.push('" footer-height="');
        this._aContent.push(ftr.size);
        this._aContent.push('"');
    }
    if (ns.isAssigned(pageNumber)) {
        this._aContent.push(' pagenumber="');
        this._aContent.push(pageNumber);
        this._aContent.push('"');
    }
    if (ns.isAssigned(paperSize)) {
        this._aContent.push(' size="');
        this._aContent.push(paperSize);
        this._aContent.push('"');
    }
    this._aContent.push(' />');
    return this;
};

/**
 * Set footer HTML.
 * Optional.
 * @param {string|ns.TableWiki} html Footer html. If first char is not &lt;, it will be enclosed with &lt;p&gt;
 * <pre>'&lt;p align="center"&gt;Page &lt;pagenumber/&gt; of &lt;totalpages/&gt;&lt;/p&gt;'</pre>
 * @param {number=} mmSize Size in mm. Optional. Defaults to 10mm.
 * @param {string=} id Id is required when specifying multiple types of footers or footers that only appear on certain pages.
 *                 Optional. If omitted, footer appears on all pages.
 * @param {number=} startPage Optional. Starting page that will use this footer.
 *       If you want a cover page without footers, specify 2 to indicate footer will be used starting in page 2.
 * @param {number=} endPage Optional. Defaults to 20. Ending page for footer.
 * @return {ns.PdfReport} Current PdfReport object
 */
ns.PdfReport.prototype.setFooter = function(html, mmSize, id, startPage, endPage) {
    if (ns.isNotAssigned(id)) {
        id = 'bodyFooter';
    }
    if (typeof html=='object' && html instanceof ns.TableWiki) {
        html = ns.context.replaceXml(html.getHtml());
    } else  if (html!=null && html.charAt(0)!='<') {
        html = '<p>' + html + '</p>';
    }
    this._footers[id] = {
        id: id,
        macro: '<macro id="'+id+'">' +
               (ns.isAssigned(html) ? html : this._defaultPagination) +
               '</macro>',
        size: ns.nvl(mmSize, this._defaultSize),
        startPage: ns.nvl(startPage, 0),
        endPage: ns.nvl(endPage, 0)
    };
    return this;
};

/**
 * Set header HTML.
 * Optional.
 * @param {string|ns.TableWiki} html Header html.If first char is not &lt;, it will be enclosed with &lt;p&gt;
 * <pre>'&lt;p align="center"&gt;Page &lt;pagenumber/&gt; of &lt;totalpages/&gt;&lt;/p&gt;'</pre>
 * @param {number=} mmSize Size in mm. Optional. Defaults to 10mm.
 * @param {string=} id Id is required when specifying multiple types of headers or headers that only appear on certain pages.
 *                 Optional. If omitted, header appears on all pages.
 * @param {number=} startPage Optional. Starting page that will use this header.
 *       If you want a cover page without headers, specify 2 to indicate header will be used starting in page 2.
 * @param {number=} endPage Optional. Defaults to 20. Ending page for header.
 * @return {ns.PdfReport} Current PdfReport object
 */
ns.PdfReport.prototype.setHeader = function(html, mmSize, id, startPage, endPage) {
    if (ns.isNotAssigned(id)) {
        id = 'bodyHeader';
    }
    if (typeof html=='object' && html instanceof ns.TableWiki) {
        html = ns.context.replaceXml(html.getHtml());
    } else  if (html!=null && html.charAt(0)!='<') {
        html = '<p>' + html + '</p>';
    }
    this._headers[id] = {
        id: id,
        macro: '<macro id="'+id+'">' +
               (ns.isAssigned(html) ? html : this._defaultPagination) +
               '</macro>',
        size: ns.nvl(mmSize, this._defaultSize),
        startPage: ns.nvl(startPage, 0),
        endPage: ns.nvl(endPage, 0)
    };
    return this;
};

/**
 * Add CSS class definitions for the PDF report.
 * Optional. Can be called multiple times for each CSS class.
 * @param {string|Array} css
 * @return {ns.PdfReport} Current PdfReport object
 */
ns.PdfReport.prototype.addCss = function(css) {
    if (typeof css == 'string') {
        this._style.push(css);
    } else { //array
        this._style = this._style.concat(css);
    }
    return this;
};

/**
 * Add font links to PDF
 * @param {string|Array} link List of font links. Name must be also declared in body font-family.
 * <pre>
 * '&lt;link name="russianfont" type="font" subtype="opentype"
 *    src="NetSuiteFonts/verdana.ttf" src-bold="NetSuiteFonts/verdanab.ttf"
 *    src-italic="NetSuiteFonts/verdanai.ttf" src-bolditalic="NetSuiteFonts/verdanabi.ttf"
 *    bytes="2"/>'
 * </pre>
 * @return {ns.PdfReport} Current PdfReport object
 */
ns.PdfReport.prototype.addLink = function(link) {
    if (typeof link == 'string') {
        this._link.push(link);
    } else { //array
        this._link = this._link.concat(link);
    }
    return this;
};

/**
 * Call to add content to the PDF.
 * Required. Can be called multiple times for additional content.
 * @param {string|ns.TableSearch|ns.TableWiki|Object} content Can be HTML string, TableWiki, TableSearch object or an array of these objects.
 * @return {ns.PdfReport} Current PdfReport object
 */
ns.PdfReport.prototype.add = function(content) {
    var t = typeof content;
    if (t=='object' && content instanceof ns.TableSearch) {
        this._aContent = this._aContent.concat(content.getHtmlArray());
    } else if (t=='object' && content instanceof ns.TableWiki) {
        this._aContent.push(ns.context.replaceXml(content.getHtml()));
    } else if (t=='object' && content instanceof Array) {
        var len = content.length;
        for(var i=0; i<len; i++) {
           this.add(content[i]);
        }
    } else {
        this._aContent.push(ns.context.replaceXml(content));
    }
    return this;
};

/**
 * Same as add, but adds a line break afterwards.
 * @param content
 * @return {ns.PdfReport} Current PdfReport object
 */
ns.PdfReport.prototype.addLine = function(content){
    if (content) {
        this.add(content);
    }
    this.add('<br/>');
    return this;
};

/**
 * Add XML Comment. For debugging purpose, will be visible when report is viewed in debug mode.
 * @param {string|Array} content Comment string
 * @return {ns.PdfReport} Current PdfReport object
 */
ns.PdfReport.prototype.addComment = function(content){
    var t = typeof content;
    if (t=='object' && content instanceof Array) {
        this._aContent.push('<!-- ');
        this._aContent = this._aContent.concat(content);
        this._aContent.push(' -->');
    } else {
        this._aContent.push('<!-- '+ content + ' -->');
    }
    return this;
};

/**
 * Internal function.
 * @param {string} name
 * @param {string} value
 */
ns.PdfReport.prototype._addMeta = function(name, value) {
    return "<meta name='"+name+"' value='"+value+"'/>";
};

/**
 * Start of block (block will avoid page breaks in between content).
 * @return {ns.PdfReport} Current PdfReport object
 */
ns.PdfReport.prototype.startBlock = function() {
    this.add('<p style="page-break-after:avoid;width:100%">');
    return this;
};

/**
 * Start of block (block will avoid page breaks in between content).
 * @return {ns.PdfReport} Current PdfReport object
 */
ns.PdfReport.prototype.endBlock = function() {
    this.add('</p><span></span>'); //workaround: need another element between blocks otherwise items are not displayed properly
    return this;
};


/**
 * Internal function.
 * @return {Array} XML header.
 */
ns.PdfReport.prototype._getXmlHeader = function() {
    return ["<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<!DOCTYPE pdf PUBLIC \"-//big.faceless.org//report\" \"report-1.1.dtd\"><pdf",
            ((this._lang!=null)?(" lang=\""+this._lang+"\" xml:lang=\""+this._lang+"\""):"") , ">\n<head>"];
};

/**
 * Get Pdf report as file object.
 * @return {Object} NetSuit file object (nlobjFile).
 */
ns.PdfReport.prototype.getFile = function(){
    var aContent = this._addHeader().concat((this._aContent.length>0)?this._aContent:['&#160;']); //workaround, empty pdf will throw error
    aContent.push("</body></pdf>");
    return nlapiXMLToPDF((this._getXmlHeader().concat(aContent)).join(''));
};

/**
 * Download PDF Report.
 * Required.
 * @param {Object} response NetSuite response object (nlobjResponse).
 * @param {boolean=} displayInline Optional. Default to inline if not passed.
 */
ns.PdfReport.prototype.download = function(response, displayInline){
    var aMeta = this._getXmlHeader(),
        aContent = this._addHeader().concat((this._aContent.length>0)?this._aContent:['&#160;']); //workaround, empty pdf will throw error
    aContent.push("</body></pdf>");
    var aPdf = aMeta.concat(aContent);
    if (this._debugXml) {
        response.setContentType('XMLDOC');
        response.write(aPdf.join(''));
    }
    else {
        if (ns.isNotAssigned(displayInline)) {
            displayInline = true;
        }
        try {
            var file = nlapiXMLToPDF(aPdf.join(''));
            if (displayInline) {
                response.setContentType('PDF', this._filename, 'inline');
            }
            else {
                response.setContentType('PDF', this._filename);
            }
            response.write(file.getValue());
        } catch(e) {
            nlapiLogExecution('ERROR','Pdf Framework: '+e.message);
            var msg = nlapiEscapeXML(e.message);
            if (msg) {
                msg = msg.replace(/'/g, "&apos;").replace(/"/g, "&quot;");
            } else {
                msg = 'Null';
            }
            var aHtml = (aMeta.concat(this._addMeta("error", msg))).concat(aContent);
            response.setContentType('XMLDOC');
            response.write(aHtml.join(''));
        }
    }
};

/**
 * Get Pdf Report as HTML. Note that css attributes are different in the PDF and actual HTML
 * and may render differently. PDF specific features are not supported. (e.g. barcode, graphs)
 * Header and Footer should not be used with this. If you need both HTML and PDF,
 * call this function without header and footer then set header and footer before calling PDF download.
 * @return {string} HTML context
 */
ns.PdfReport.prototype.getHtml = function(){
    var aHtml = (["<html><head>"].concat(this._addHeader())).concat(this._aContent);
    aHtml.push("</body></html>");
    return aHtml.join('');
};


/**
 * Set PDF Language. Automatically adds font link "nsFont" which must be declared in body font-family css.
 * <pre>
 *     body { font-family: nsFont, Helvetica; font-size:10pt }
 * </pre>
 * @param {Object} lang Language.
 * <pre>
 * 'ja-JP' (Japanese),'zh-CN' (Simplified Chinese),'zh-TW' (Traditional Chinese),
 * 'ko-KR' (Korean), 'ru-RU' (Russian)
 * </pre>
 * @return {ns.PdfReport} Current PdfReport object
 */
ns.PdfReport.prototype.setLang = function(lang){
    this._lang = lang;
    this.addLink('<link name="nsFont" type="font" subtype="opentype" '+
                 'src="NetSuiteFonts/verdana.ttf" src-bold="NetSuiteFonts/verdanab.ttf" '+
                 'src-italic="NetSuiteFonts/verdanai.ttf" src-bolditalic="NetSuiteFonts/verdanabi.ttf" '+
                 'bytes="2"/>');
    return this;
};


/**
 * Internal function.
 * @return {Array} Header xml
 */
ns.PdfReport.prototype._addHeader = function(){
    var aXml = [];
    if (this._layout!='single-page') {
        aXml.push(this._addMeta("layout", this._layout));
    }
    if (this._link.length>0) {
        aXml = aXml.concat(this._link);
    }
    var aBodyAttr = [],
        aMacros = [],
        aPageCss = [];
    for(var id in this._headers) {
        var hdr = this._headers[id];
        aMacros.push(hdr.macro);
        if (id=='bodyHeader') {
            aBodyAttr.push(' header="bodyHeader" header-height="');
            aBodyAttr.push(hdr.size);
            aBodyAttr.push('mm"');
        }
        if (hdr.startPage>0) {
            var end = (hdr.endPage>0) ? hdr.endPage : 20;
            for(var i=hdr.startPage; i<=end; i++) {
                aPageCss[i] = [ ' header:', id, '; header-height:', hdr.size, 'mm;'].join('');
            }
        }
    }
    for(var id in this._footers) {
        var ftr = this._footers[id];
        aMacros.push(ftr.macro);
        if (id=='bodyFooter') {
            aBodyAttr.push(' footer="bodyFooter" footer-height="');
            aBodyAttr.push(ftr.size);
            aBodyAttr.push('mm"');
        }
        if (ftr.startPage>0) {
            var end = (ftr.endPage>0) ? ftr.endPage : 20;
            for(var i=ftr.startPage; i<=end; i++) {
                aPageCss[i] = [ ns.nvl(aPageCss[i],''), ' footer:', id, '; footer-height:', ftr.size, 'mm;'].join('');
            }
        }
    }
    var pageCssLen = aPageCss.length,
        styleLen = this._style.length;
    if (styleLen>0 || pageCssLen>0) {
        aXml.push('<style type="text/css">');
        if (pageCssLen>0) {
            for(var page in aPageCss) {
                aXml = aXml.concat(['#page',page,' {',aPageCss[page],'}\n']); //TODO optimize
            }
        }
        if (styleLen>0) {
            aXml = aXml.concat(this._style);
        }
        aXml.push('</style>');
    }
    if (aMacros.length > 0) {
        aXml.push('<macrolist>');
        aXml = aXml.concat(aMacros);
        aXml.push('</macrolist>');
    }
    aXml.push("</head>\n");
    if (ns.isAssigned(this._size)) {
        aBodyAttr.push(' size="');
        aBodyAttr.push(this._size);
        aBodyAttr.push('"');
    }
    aXml.push("<body ");
    if (aBodyAttr.length > 0) {
        aXml = aXml.concat(aBodyAttr);
        aXml.push(" ");
    }
    if (this._bodyAttr.length > 0) {
        aXml.push(this._bodyAttr.join(' '));
    }
    aXml.push(">");
    return aXml;
};
