/*
	Translate - Firefox Extension that facilitates the translation of text and/or webpages
    Copyright (C) 2007  Paul Grave

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation; either version 2 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License along
    with this program; if not, write to the Free Software Foundation, Inc.,
    51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
	
	
*/
const PGTRANSLATE_LANGUAGEPAIRS = new Array();
PGTRANSLATE_LANGUAGEPAIRS[0] = new Array("en","fr", "de", "es", "it","nl", "pt", "el", "ko","ja", "zh", "zt", "ru");
PGTRANSLATE_LANGUAGEPAIRS[1] = new Array("fr","en", "de", "es", "it","pt", "nl", "el");
PGTRANSLATE_LANGUAGEPAIRS[2] =  new Array("de","en", "fr");
PGTRANSLATE_LANGUAGEPAIRS[3] =  new Array("es","en", "fr");
PGTRANSLATE_LANGUAGEPAIRS[4] =  new Array("it","en", "fr");
PGTRANSLATE_LANGUAGEPAIRS[5] =  new Array("el","en", "fr");
PGTRANSLATE_LANGUAGEPAIRS[6] =  new Array("ko","en");
PGTRANSLATE_LANGUAGEPAIRS[7] =  new Array("ja","en");
PGTRANSLATE_LANGUAGEPAIRS[8] =  new Array("zh","en");
PGTRANSLATE_LANGUAGEPAIRS[9] =  new Array("zt","en");
PGTRANSLATE_LANGUAGEPAIRS[10] =  new Array("nl","en", "fr");
PGTRANSLATE_LANGUAGEPAIRS[11] =  new Array("ru","en");
PGTRANSLATE_LANGUAGEPAIRS[12] =  new Array("pt","en", "fr");

const PGTRANSLATE_LANGUAGEUNICODE = new Array();
PGTRANSLATE_LANGUAGEUNICODE[0] = "English";
PGTRANSLATE_LANGUAGEUNICODE[1] = "Fran\u00E7ais";
PGTRANSLATE_LANGUAGEUNICODE[2] =  "Deutsch";
PGTRANSLATE_LANGUAGEUNICODE[3] =  "espa\u00F1ol";
PGTRANSLATE_LANGUAGEUNICODE[4] =  "italiano";
PGTRANSLATE_LANGUAGEUNICODE[5] =  "\u03B5\u03BB\u03BB\u03B7\u03BD\u03B9\u03BA\u03AC";
PGTRANSLATE_LANGUAGEUNICODE[6] =  "\uD55C\uAD6D\uC5B4";
PGTRANSLATE_LANGUAGEUNICODE[7] =  "\u65E5\u672C\u8A9E";
PGTRANSLATE_LANGUAGEUNICODE[8] = "\u7B80\u4F53\u4E2D\u6587";
PGTRANSLATE_LANGUAGEUNICODE[9] =  "\u7E41\u9AD4\u4E2D\u6587";
PGTRANSLATE_LANGUAGEUNICODE[10] =  "Nederlands";
PGTRANSLATE_LANGUAGEUNICODE[11] =  "\u0440\u0443\u0441\u0441\u043A\u0438\u0439";
PGTRANSLATE_LANGUAGEUNICODE[12] =  "portugu\u00EAs";
