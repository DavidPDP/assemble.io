# [helper-lib v0.2.6](http://github.com/assemble/helper-lib) [![Build Status](https://travis-ci.org/assemble/helper-lib.png)](https://travis-ci.org/assemble/helper-lib)

> Extensive collection of Handlebars helpers.

## Quick start
For linting and testing this project uses Grunt `~0.4.1`, but Grunt is **not required** to use the helpers. Check out the [Getting Started](http://gruntjs.com/getting-started) guide to learn more about Grunt.

```shell
npm install helper-lib --save
```
Once helper-lib has been installed, it may be used within your application with the following JavaScript:

```js
var handlebars = require('Handlebars');
var helpers = require('helper-lib');
helpers.register(Handlebars);
```

Now your handlebars instance will have access to the helpers.

### Features unique to helper-lib

Some helpers offer useful functionality that is unique to this project, such as:

* File globbing using [minimatch](https://github.com/isaacs/minimatch) patterns
* Access to [assemble](https://github.com/assemble/assemble) options.
* Ability to render either markdown or HTML conditionally based on the file extension of the generated file.

Lots more...

**Table of Contents**

## [The Helpers](#the-helpers)

### [Path](#path)
* [{{relative}}](#relative)
* [{{extname}}](#extname)
* [{{dirname}}](#dirname)

### [URL](#url)
* [{{url_resolve}}](#url_resolve)
* [{{url_parse}}](#url_parse)

### [File](#file)
* [{{include}}](#include)
* [{{glob}}](#glob)
* [{{copy}}](#copy)

### [Strings](#strings)
* [{{occurrences}}](#occurrences)
* [{{hyphenate}}](#hyphenate)
* [{{dashify}}](#dashify)
* [{{lowercase}}](#lowercase)
* [{{uppercase}}](#uppercase)
* [{{capitalizeFirst}}](#capitalizefirst)
* [{{capitalizeEach}}](#capitalizeeach)
* [{{titleize}}](#titleize)
* [{{sentence}}](#sentence)
* [{{reverse}}](#reverse)
* [{{truncate}}](#truncate)
* [{{center}}](#center)
* [{{formatPhoneNumber}}](#formatphonenumber)

### [HTML](#html)
* [{{gist}}](#gist)
* [{{blockquote}}](#blockquote)
* [{{timeline}}](#timeline)
* [{{exticon}}](#exticon)
* [{{ul}}](#ul)
* [{{ol}}](#ol)
* [{{br}}](#br)

### [Collections](#collections)
* [{{first}}](#first)
* [{{withFirst}}](#withfirst)
* [{{last}}](#last)
* [{{withLast}}](#withlast)
* [{{after}}](#after)
* [{{withAfter}}](#withafter)
* [{{before}}](#before)
* [{{withBefore}}](#withbefore)
* [{{join}}](#join)
* [{{sort}}](#sort)
* [{{withSort}}](#withsort)
* [{{length}}](#length)
* [{{lengthEqual}}](#lengthequal)
* [{{empty}}](#empty)
* [{{any}}](#any)
* [{{inArray}}](#inarray)
* [{{eachIndex}}](#eachindex)
* [{{eachProperty}}](#eachproperty)

### [Math](#math)
* [{{add}}](#add)
* [{{subtract}}](#subtract)
* [{{divide}}](#divide)
* [{{multiply}}](#multiply)
* [{{floor}}](#floor)
* [{{ceil}}](#ceil)
* [{{round}}](#round)
* [{{sum}}](#sum)

### [Numbers](#numbers)
* [{{toFixed}}](#tofixed)
* [{{toPrecision}}](#toprecision)
* [{{toExponential}}](#toexponential)
* [{{toInt}}](#toint)
* [{{toFloat}}](#tofloat)
* [{{toAbbr}}](#toabbr)
* [{{addCommas}}](#addcommas)

### [Comparisons: Equal](#comparisons-equal)
* [{{is}}](#is)
* [{{if_eq}}](#if_eq)
* [{{isnt}}](#isnt)
* [{{or}}](#or)
* [{{and}}](#and)
* [{{unless_eq}}](#unless_eq)

### [Comparisons: Greater Than](#comparisons-greater-than)
* [{{if_gt}}](#if_gt)
* [{{gt}}](#gt)
* [{{unless_gt}}](#unless_gt)
* [{{if_gteq}}](#if_gteq)
* [{{gte}}](#gte)
* [{{unless_gteq}}](#unless_gteq)

### [Comparisons: Less Than](#comparisons-less-than)
* [{{lt}}](#lt)
* [{{lte}}](#lte)
* [{{unless_lt}}](#unless_lt)
* [{{unless_lteq}}](#unless_lteq)

### [Dates](#dates)
* [{{formatDate}}](#formatdate)
* [{{now}}](#now)
* [{{timeago}}](#timeago)

### [Inflections](#inflections)
* [{{inflect}}](#inflect)
* [{{ordinalize}}](#ordinalize)

### [Logging](#logging)
* [{{log}}](#log)
* [{{debug}}](#debug)
* [{{expandJSON}}](#expandjson)
* [{{expandYAML}}](#expandyaml)

### [Special](#special)
* [{{embed}}](#embed)

#### [README Helpers](#readme-helpers)
* [{{authors}}](#authors)

#### [Travis CI](#travis-ci)
* [{{travis}}](#travis)
* [{{travis-badge}}](#travis-badge)
* [{{changelog}}](#changelog)
* [{{jsfiddle}}](#jsfiddle)
  - [Embedding the fiddle](#embedding-the-fiddle)
  - [Examples](#examples)
  - [Optional tabs](#optional-tabs)
* [Changing skins](#changing-skins)

### [Miscellaneous](#miscellaneous)
* [{{default}}](#default)
* [{{noop}}](#noop)


---

## Markdown helpers

> Markdown helpers only work with [assemble](https://github.com/assemble/assemble), Grunt.js plugin for generating sites.

#### {{md}}
_Include markdown from specified file(s), and render it to HTML_

Template:
```html
{{md "file/to/include/post.md"}}
```
Any content inside the "included" markdown file will be rendered as HTML.


#### {{markdown}}
_Block helper for embedding markdown content inside HTML, and rendering it to HTML at build time._

Template:
```html
<h1>My Blog</h1>

{{#markdown}}
## Post of the day

Vestibulum posuere, quam sed bibendum posuere
Pellentesque habitant morbi tristique senectus
Pellentesque nulla augue, volutpat vitae

[Read more...](https://github.com/assemble/jonschlinkert)

In hac habitasse platea dictumst. Morbi non rutrum risus.

{{/markdown}}
```

Renders to:
```html
<h1>My Blog</h1>

<h2>Post of the day</h2>

<p>Vestibulum posuere, quam sed bibendum posuere
Pellentesque habitant morbi tristique senectus
Pellentesque nulla augue, volutpat vitae</p>

<a href="https://github.com/assemble/jonschlinkert">Read more...</a>

<p>In hac habitasse platea dictumst. Morbi non rutrum risus.</p>
```



## Code helpers
#### {{embed}}
_Embed code from specified file(s)_

Parameters:
* `String|File` : path to the file you want to embed
* `String|Language (optional)`: Optional second parameter to "force" a specific language to use fo syntax highlighting.

Unless overridden by a given extension, the helper will automatically use the extension of the specified file as the language to use for syntax highlighting. You may also force the helper to use a language that is different than the extension of the file.

For example, here we will force highlighting as `javascript` instead of `json`
```hbs
{{ embed 'src/example.json' 'js' }}
```

When embedding a markdown snippet (`.md|markdown|markd`), the helper automatically converts any code fences inside the snippet their unicode equivalent (`&#x60;&#x60;&#x60;`)
```
{{embed 'src/example.md'}}
```

**File globbing**

The `embed` helper also accepts globbing patterns:
```
{{embed 'src/code-examples/*.*'}}
```
When globbing file is used, the code from each file will be embedded separately, and the file extension of each file will be used to identify the language to use for syntax highlighting. You may of course override the language, but whatever language you use will be applied to every embedded file.

_use globbing carefully! Until you have the hang of it try to be on the safe side and be more specific with your patterns_


#### {{gist}}
_Embed public GitHub Gists by adding only the Id of the Gist. The helper also accepts an optional second parameter for targeting a specific file on the Gist.._

Parameters: `String`
Default: `undefined`
Usage: `{{ gist [id] }}`

Example:
```hbs
{{gist '5193239'}}
```
Output:
```html
<script src="https://gist.github.com/5193239.js"></script>
```


#### {{jsfiddle}}
_Easily embed a [jsFiddle](http://jsfiddle.net) in a page, requiring only the ID of the fiddle._

Credit: [octopress](http://octopress.org/docs/plugins/jsfiddle-tag/)

Parameters: `{{ jsfiddle "id" "tabs" "skin" "height" "width" }}`
  * `id`: full URL to the fiddle excluding `http://jsfiddle.net`
  * `tabs`: tabs to be displayed, and the order specified
  * `skin`: the skin to be used, `light` or `presentation` are the only options available.
  * `height`: the height of the rendered `<iframe>`
  * `width`: the width of the rendered `<iframe>`

Template:
```html
{{ jsfiddle 'ccWP7' }}
```

##### Fiddle tabs
You may also adjust the tabs shown and/or the order in which tabs are displayed.

Default tabs and display order: `js,resources,html,css,result`

Options:
* `js`, `html`, `css`: tabs for displaying code
* `result`: tab for displaying the rendered result of the code
* `resources`: tabs for displaying the list of external resources used. This tab will not be displayed if no resources were used.

Template:
```html
{{jsfiddle 'ccWP7' 'result,js,html,css'}}
```

Renders to:
```html
<iframe style="width: 100%; height: 210px"src="http://jsfiddle.net/ccWP7/embedded/result,js,html,css/"></iframe>
```

You may remove the tabs you don't need:

Template:
```html
{{jsfiddle 'ccWP7' 'js,result'}}
```

Renders to:
```html
<iframe style="width: 100%; height: 210px"src="http://jsfiddle.net/abc123/embedded/js,result/"></iframe>
```

#### Fiddle skins
A third _optional_ parameter may be used to specify the "skin" for the fiddle. At time of writing, the only skins available are `light` and `presentation`. However as [jsFiddle](http://jsfiddle.net) announces new skins they may be used immediately.

Default: `light`

Template:
```html
{{jsfiddle 'ccWP7' 'result,js,html,css' 'presentation'}}
```

Renders to:
```html
<iframe style="width: 100%; height: 210px"src="http://jsfiddle.net/ccWP7/embedded/js,result/presentation/"></iframe>
```



## Path helpers
Path helpers are [node.js](http://nodejs.org/api/path.html) utilities for handling and transforming file paths. As with node.js:

> "these helpers perform only string transformations. The file system is not consulted to check whether paths are valid."

#### {{relative}}
_Derive the relative path from one **absolute path** to another (e.g from path A, to path B)._
<br>Parameters: `string` (the value to test against)
<br>Default: `none`

Example:
```html
{{relative "from" "to"}}
```
Template:
```html
<a href="{{relative "src" "dist"}}/assets/css/styles.css"></a>
```

Renders to:
```html
<a href="../../dist/assets/css/styles.css"></a>
```

#### {{extname}}
_"Return the extension of the path, from the last '.' to end of string in the last portion of the path. If there is no '.' in the last portion of the path or the first character of it is '.', then it returns an empty string."_

Parameters: `string` (the value to test against).
Default: `none`

Template:
```html
{{extname 'index.html'}}
```

Renders to:
```
.html
```

Template:
```
{{extname 'index.'}}
```

Renders to:
```
.
```

Template:
```
{{extname 'index'}}
```

Returns nothing.



#### {{dirname}}
_Return the directory name of a path. Similar to the Unix dirname command._

Template:

```html
{{dirname '/foo/bar/baz/asdf/quux'}}

Renders to:
```
'/foo/bar/baz/asdf'
```



## URL helpers
URL helpers are [node.js](http://nodejs.org/api/url.html) `url` utilities for URL resolution and parsing. As with node.js:

> "Parsed URL objects have some or all of the following fields, depending on whether or not they exist in the URL string. Any parts that are not in the URL string will not be in the parsed object."

#### {{url_resolve}}
_Take a base URL, and a href URL, and resolve them as a browser would for an anchor tag._

<br>Template:
```haskell
{{url_resolve url href}}
```
Example:
```html
<a href="{{url_resolve "http://example.com/one" "/two"}}"></a>
```
Renders to:
```html
<a href="http://example.com/two"></a>
```


#### {{url_parse}}
_Take a URL string, and return an object._

Params:
* `url`
* Output format: `yaml` or `json`. Default: `json`

Template:
```
{{url_parse "http://example.com/one"}}
```

Renders to:
```json
{
  "protocol": "http:",
  "slashes": true,
  "auth": null,
  "host": "example.com",
  "port": null,
  "hostname": "example.com",
  "hash": null,
  "search": null,
  "query": null,
  "pathname": "/one",
  "path": "/one",
  "href": "http://example.com/one"
}
```

Or with `yaml` as the second param:
```haskell
{{url_parse "http://foo.com/bar/baz?key=value" "yaml"}}
```

Renders to:
```coffeescript
protocol: "http:"
slashes: true
auth: null
host: "foo.com"
port: null
hostname: "foo.com"
hash: null
search: "?key=value"
query: "key=value"
pathname: "/bar/baz"
path: "/bar/baz?key=value"
href: "http://foo.com/bar/baz?key=value"
parse:
format:
resolve:
resolveObject:
parseHost:
```


## File helpers
#### {{include}}
_Include external files._

<br>Pattern: `{{include [name] [data]}}`
<br>Parameters:

* name (required): `[string]` - The name or path of the file in which your template is defined. (Required)
* data (optional): `[int|string|collection]` - Data you want to use inside the include.

Data (collection): `planet-express.json`

```js
[
  "Professor Farnsworth",
  "Fry",
  "Bender"
]
```

Include (partial to be "included"): `planet-express.hbs`
```html
{{sort this}}
```

Template:
```html
<p>{{include "planet-express.hbs" data}}</p>
```

Renders to:
```html
<p>Bender, Fry, Professor Farnsworth</p>
```

#### {{glob}}
**example helpers, not for actual use!**
Why do this? The goal is to inspire other concepts that build from this one.

_Use globbing patterns to embed content from specified file or files._
<br>Parameters: `String`
<br> Default: `undefined`

Examples:
```html
{{glob 'src/files/*.md'}}
{{glob 'src/files/*.{txt,md}'}}
```

#### {{copy}}
**example helpers, not for actual use!**
Why do this? The goal is to inspire other concepts that build from this one.

_Example helper, copies file A to path B._
<br>Parameters: `String`
<br> Default: `undefined`

Example:
```html
{{copy 'a.html' '../dir/b.txt'}}
```


## README helpers
#### {{authors}}
Generates a list of markdown-formatted project authors from the AUTHORS file in the root of a project. Since Handlebars enforces case sensitivity with helper names, this helper comes in two different flavors: `{{AUTHORS}}` or `{{authors}}`.

Params: `none`
Usage: `{{authors}}` or `{{authors "path/to/AUTHORS"}}`

Data (`AUTHORS` file in the root of our project):

```
Brian Woodward (http://github.com/doowb)
Jon Schlinkert (http://github.com/jonschlinkert)
```

Template (lowercase version):
```html
{{authors}}
```

Renders to:
```md
* [Brian Woodward](http://github.com/doowb)
* [Jon Schlinkert](http://github.com/jonschlinkert)
```

Or the uppercase version:
```html
{{AUTHORS}}
```

Renders to:
```
**Jon Schlinkert**

+ [http://twitter.com/jonschlinkert](http://twitter.com/jonschlinkert)
+ [http://github.com/jonschlinkert](http://github.com/jonschlinkert)

**Brian Woodward**

+ [http://twitter.com/doowb](http://twitter.com/doowb)
+ [http://github.com/doowb](http://github.com/doowb)
```


### Travis CI

#### {{travis}}
_Creates a "full" Travis CI link in markdown format_.

Params: `branch`
Type: `String`
Usage: `{{travis [branch]}}`

Template:
```html
{{travis}}`
```

Renders to:
```markdown
# [helper-lib v2.0.0](https://github.com/assemble/helper-lib)[![Build Status](https://travis-ci.org/assemble/helper-lib.png)](https://travis-ci.org/assemble/helper-lib)
```

Template with branch:
```html
{{travis 'master'}}
```

Renders to:
```markdown
# [helper-lib v2.0.0](https://github.com/assemble/helper-lib)[![Build Status](https://travis-ci.org/assemble/helper-lib.png?branch=master)](https://travis-ci.org/assemble/helper-lib)
```

#### {{travis-badge}}
_Creates a Travis CI link in markdown format_.

Params: `none`
Usage: `{{travis-badge}}`

Template
```html
{{travis}}`
```

Renders to:
```markdown
[![Build Status](https://travis-ci.org/assemble/helper-lib.png)](https://travis-ci.org/assemble/helper-lib)
```

#### {{changelog}}
A few convenience helpers that read data in YAML format, and do interesting things with the data. Well... they "do things" with the data. Anyway I guess only nerds like me find it interesting.

**NOTE**: These helpers will throw an error if the source files are not  valid YAML format, using the following conventions:

A couple things to keep in mind about YAML:

* YAML is picky, so don't be surprised if the parser throws an error from improperly placed quotation marks.
* Seriously, don't be surprised. If you even come onto the issues and act surprised when it happens, an automated message will tell you to read the first bullet.

Example of the format to follow in your `CHANGELOG` file:

```yaml
v0.1.2
  date: "2014-04-09"
  changes:
    - The future sucks.
    - This is my third and last commmit from the future.
v0.1.1
  date: "2014-04-08"
  changes:
    - Second commit from the future.
    - The future is more boring that I thought it would be.
v0.1.0
  date: "2014-03-07"
  changes:
    - First commit... from the future. Yes!
```
Of coure, you are under no obligation to make your changelog entries as interesting as these, and you may record your entries at any point in whatever timeline you prefer, but whatever you write must be valid YAML when you do it.

The output will look like this:

```md
* 2013-03-15    v0.1.2    Update README.md with documentation, examples.
* 2013-03-06    v0.1.0    First commit.
```

* More info here: [js-yaml](https://github.com/nodeca/js-yaml)
* See the tests here: [test/helpers/special_test.js](test/helpers/special_test.js)



## HTML helpers
#### {{doctype}}
_Easy way to add an uncommonly used doctype._

Default: HTML 5 (`<!DOCTYPE html>`), although tThis is probably only useful on projects that use anything besides HTML 5.

Template:
```
{{DOCTYPE 'svg 1.1'}}
```
Renders to:
```html
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
```

Available doctypes:

**HTML 5 (default)**
* `<!DOCTYPE html>`
* examples: `{{doctype '5'}}`, `{{doctype 'html5'}}`
* aliases: `5`, `html`, `html5`

**XML**
* `<?xml version="1.0" encoding="utf-8" ?>`
* example: `{{doctype 'xml'}}`
* aliases: `xml`

**XHTML**
* `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">`
* example: `{{doctype 'strict'}}`
* aliases: `strict`
* `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">`
* aliases: `transitional`
* `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">`
* aliases: `frameset`
* `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">`
* aliases: `1.1`, `xhtml 1.1`
* `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML Basic 1.1//EN" "http://www.w3.org/TR/xhtml-basic/xhtml-basic11.dtd">`
* aliases: `basic`
* `<!DOCTYPE html PUBLIC "-//WAPFORUM//DTD XHTML Mobile 1.2//EN" "http://www.openmobilealliance.org/tech/DTD/xhtml-mobile12.dtd">`
* aliases: `mobile`

**HTML 4.01**
* `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">`
* aliases: `4`, `4.01`, `4.01 strict`
* `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">`
* aliases: `4.01 trans`
* `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" "http://www.w3.org/TR/html4/frameset.dtd">`
* aliases: `4.01 frameset`

**SVG**
* `<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">`
* aliases: `svg`, `svg 1.1`, `svg1.1`
* `<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.0//EN" "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">`
* aliases: `svg 1.0`, `svg1.0`, `svg1`



#### {{blockquote}}
**Planned...**

_Create a blockquote. Outputs a string with a given attribution as a quote._

Template:

```html
{{#blockquote '@doowb' 'http://github.com/source/for/your/quote' 'This is the title' }}
  This is your quote.
{{/blockquote}}
```

Renders to:

```html
<blockquote>
  <p>This is your quote.</p>
  <footer>
    <strong>@doowb</strong>
    <cite>
      <a href="http://github.com/source/for/your/quote">This is the title</a>
    </cite>
  </footer>
</blockquote>
```

#### {{timeline}}
**Planned...**

_Iterates through an array, letting the contents know whether a timeline entry belongs in the left or right column._

Parameters:

* `array` to iterate over,
* `string`: CSS class name for left columns
* `string`: CSS class name for right columns

Credit: by [@jonschlinkert](http://github.com/jonschlinkert), and based on striped helper from [treehouse blog](http://blog.teamtreehouse.com/handlebars-js-part-2-partials-and-helpers)

Usage:
```html
<div class="timeline">
 {{#timeline myArray "left" "right"}}
 <div class="{{columnClass}}">
   {{> entry}}
 </div>
 {{else}}
   <em>There aren't any entries.</em>
 {{/timeline}}
</div>
```

#### {{exticon}}
_Generate the appropriate icon based on the extension of the given file._

Since this helper generates classes that are very specific, feel free to copy the code and use it as inspiration for your a helper that works for you.

Usage:
```html
{{exticon 'file.png'}}
{{exticon 'file.pdf'}}
{{exticon 'file.doc'}}
{{exticon 'file.txt'}}
{{exticon 'file.csv'}}
{{exticon 'file'}}
```
Output:
```html
<img src="img/img-icon.png"><i>file.png</i>
<img src="img/pdf-icon.png"><i>file.pdf</i>
<img src="img/word-icon.png"><i>file.doc</i>
<img src="img/txt-icon.png"><i>file.txt</i>
<img src="img/csv-icon.png"><i>file.csv</i>
<img src="img/other-icon.png"><i>file</i>
```

#### {{ul}}
_Creates an unordered list._

Parameters: `Hash|HTML attributes`, `Optional`

HTML attributes to use on the `ul` element.
```js
// Data
collection = [
  name: 'Leela'
  deliveries: 8021,
  name: 'Bender'
  deliveries: 239,
  name: 'Fry'
  deliveries: 1
]
```
Template:
```html
{{#ul collection class="deliveries-list"}}
  {{name}} - {{inflect deliveries "delivery" "deliveries" true}}
{{/ul}}
```
```html
// Output:
<ul class="deliveries-list">
  <li> Leela - 8021 deliveries </li>
  <li> Bender - 239 deliveries </li>
  <li> Fry - 1 delivery </li>
</ul>
```
#### {{ol}}
_Same as the `ul` helper but creates and ordered list. Returns `<br>` tags based on a count._

Parameters: `Hash`, `HTML attributes`, `Optional`

HTML attributes to use on the `ol` element.
```js
// Data
collection = [
  name: 'Leela'
  deliveries: 8021,
  name: 'Bender'
  deliveries: 239,
  name: 'Fry'
  deliveries: 1
]
```

Template:
```html
{{#ol collection class="deliveries-list"}}
  {{name}} - {{inflect deliveries "delivery" "deliveries" true}}
{{/ol}}
```
```html
// Output:
<ol class="deliveries-list">
  <li> Leela - 8021 deliveries </li>
  <li> Bender - 239 deliveries </li>
  <li> Fry - 1 delivery </li>
</ol>
```

#### {{br}}
_Renders `<br>` elements in the output, based on the number given as a parameter. Not really recommended for general use, but it's here if you need it._

Parameters: `Integer|Count`, `Optional`

The number of `br` elements to render.

`template.hbs`
```html
{{br 5}}
```
renders to:
```html
`<br><br><br><br><br>`
```


## String helpers
#### {{occurrences}}
_Evaluate string A, and count the occurrences of string B within string A_
<br>Default: `undefined`
<br>Parameters:
* `String A` (required): The string to evaluate
* `String B` (required): The string to look for and count in "string A"

```html
{{occurrences "evaluate this string" "evaluate"}}
```
Result :
```
1
```

#### {{hyphenate}}
_Replace spaces in string with hyphens._
<br>Parameters: `none`
```html
{{hyphenate "make this all hyphenated"}}
```
Result :
```
make-this-all-hyphenated
```

#### {{dashify}}
_Same as `hyphenate`, but replaces dots in string with hyphens._
<br>Parameters: `none`
```html
{{dashify "make.this.all.hyphenated"}}
```
Renders to:
```
make-this-all-hyphenated
```

#### {{lowercase}}
_Turns a string to lowercase._
<br>Parameters: `none`
```html
{{lowercase "MAKE THIS ALL LOWERCASE"}}
```
Renders to:
```
make this all lowercase
```

#### {{uppercase}}
_Turns a string to uppercase. Opposite of `{{lowercase}}`._
<br>Parameters: `none`
```html
 {{uppercase "make this all uppercase"}}
```
Renders to:
```
MAKE THIS ALL UPPERCASE
```

#### {{capitalizeFirst}}
_Capitalizes the first word in a string._
<br>Parameters: `none`
```html
{{capitalizeFirst "capitalize first word in this sentence"}}
```
Renders to:
```
Capitalize first word in this sentence
```

#### {{capitalizeEach}}
_Capitalizes each word in a string._
<br>Parameters: `none`
```html
{{capitalizeEach "capitalize EACH word in this sentence"}}
```
Renders to:
```
Capitalize EACH Word In This Sentence
```

#### {{titleize}}
_Capitalizes all words within a string. Taken from the templating library [Walrus](https://github.com/jeremyruppel/walrus) by [Jeremy Ruppel](https://github.com/jeremyruppel)._
<br>Parameters: `none`
```html
{{titleize "capitalize EACH word in this sentence"}}
```
Renders to:
```
Capitalize Each Word In This Sentence.
```

#### {{sentence}}
_Capitalizes the first word of each sentence in a string and converts the rest of the sentence to lowercase._
Parameters: `none`
```html
{{sentence "capitalize the FIRST word in each sentence. but make the OTHER words lowercase."}}
```
Renders to:
```
Capitalize the first word in each sentence. But make the other words lowercase.
```

#### {{reverse}}
_Reverses a string._
<br>Parameters: `none`
```html
{{reverse "bender should NOT be allowed on TV."}}
```
Renders to:
```
.VT no dewolla eb TON dluohs redneb
```

#### {{truncate}}
_Truncates a string given a specified `length`, providing a custom string to denote an `omission`._
<br>Parameters:

* length: `int`- The number of characters to keep (Required).
* omission: `string` - A string to denote an omission (Optional).

```html
{{truncate "Bender should not be allowed on tv." 31 "..."}}
```
Renders to:
```
Bender should not be allowed...
```

#### {{center}}
_Centers a string using non-breaking spaces._
<br>Parameters: spaces: `int` - The number of spaces. (Required)
```html
{{center "Bender should not be allowed on tv." 10}}
```
Renders to:
```
|              Bender should not be allowed on tv.              |
```

#### {{formatPhoneNumber}}
_Output a formatted phone number_

Credit: [Treehouse Blog](http://blog.teamtreehouse.com/handlebars-js-part-2-partials-and-helpers)

Data:
```js
number: 4444444444
```
Template:
```html
{{formatPhoneNumber number}}
```
Renders to:
```
(444) 444-4444
```



## Collections helpers
#### {{first}}
_Returns the first item in a collection._
<br>Parameters: `none`

Data:
```js
collection = [
  'Amy Wong',
  'Bender',
  'Dr. Zoidberg',
  'Fry',
  'Hermes Conrad',
  'Leela',
  'Professor Farnsworth',
  'Scruffy'
]
```
Template:
```html
{{first collection}}

```

Renders to:
```
Amy Wong
```

#### {{withFirst}}
_Use the first item in a collection inside a block._
<br>Parameters: `none`

Data:
```js
collection = [
  'Amy Wong',
  'Bender',
  'Dr. Zoidberg',
  'Fry',
  'Hermes Conrad',
  'Leela',
  'Professor Farnsworth',
  'Scruffy'
]
```
Template:
```html
{{#withFirst collection}}
  <p>{{this}} is smart.</p>
{{/withFirst}}

```

Renders to:
```html
<p>Amy Wong is smart.</p>
```

#### {{last}}
_Returns the last item in a collection. Opposite of `first`._
<br>Parameters: `none`

Data:
```js
collection = [
  'Amy Wong',
  'Bender',
  'Dr. Zoidberg',
  'Fry',
  'Hermes Conrad',
  'Leela',
  'Professor Farnsworth',
  'Scruffy'
]
```
Template:
```html
{{last collection}}

```

Renders to:
```
Scruffy
```

#### {{withLast}}
_Use the last item in a collection inside a block. Opposite of `withFirst`._
<br>Parameters: `none`

Data:
```js
collection = [
  'Amy Wong',
  'Bender',
  'Dr. Zoidberg',
  'Fry',
  'Hermes Conrad',
  'Leela',
  'Professor Farnsworth',
  'Scruffy'
]
```
Template:
```html
{{#withLast collection}}
  <p>{{this}} is lazy.</p>
{{/withLast}}

```

Renders to:
```html
<p>Scruffy is lazy.</p>
```

#### {{after}}
_Returns all of the items in the collection after the specified count._
<br>Parameters: count `int` - How many items to omit from the beginning. (Required)
```
// Date
collection = [
  'Amy Wong',
  'Bender',
  'Dr. Zoidberg',
  'Fry',
  'Hermes Conrad',
  'Leela',
  'Professor Farnsworth',
  'Scruffy'
]
```
Template:
```html
{{after collection 5}}
```

Renders to:
```html
Leela, Professor Farnsworth, Scruffy
```

#### {{withAfter}}
_Use all of the items in the collection after the specified count inside a block._
<br>Parameters: count `int` - How many items to omit from the beginning. (Required)

Data:
```js
collection = [
  'Amy Wong',
  'Bender',
  'Dr. Zoidberg',
  'Fry',
  'Hermes Conrad',
  'Leela',
  'Professor Farnsworth',
  'Scruffy'
]
```
Template:
```html
{{#withAfter collection 5}}
    {{titleize this}}
{{/withAfter}}

```

Renders to:
```
Leela Professor Farnsworth Scruffy
```

#### {{before}}
_Returns all of the items in the collection before the specified count. Opposite of `after`._
<br>Parameters: count `int` - How many items to omit from the end. (Required)

Data:
```js
collection = [
  'Amy Wong',
  'Bender',
  'Dr. Zoidberg',
  'Fry',
  'Hermes Conrad',
  'Leela',
  'Professor Farnsworth',
  'Scruffy'
]
```
Template:
```html
{{before collection 5}}

```

Renders to:
```
Amy Wong, Bender, Dr. Zoidberg
```

#### {{withBefore}}
_Use all of the items in the collection before the specified count inside a block. Opposite of `withAfter`._
<br>Parameters: count `int` - How many items to omit from the end. (Required)

Data:
```js
collection = [
  'Amy Wong',
  'Bender',
  'Dr. Zoidberg',
  'Fry',
  'Hermes Conrad',
  'Leela',
  'Professor Farnsworth',
  'Scruffy'
]
```
Template:
```html
{{#withBefore collection 5}}
    {{reverse this}}
{{/withBefore}}
```

Renders to:
```
gnoW ymA redneB grebdioZ .rD
```

#### {{join}}
_Joins all elements of a collection into a string using a separator if specified._
<br>Parameters: separator `string` - A string to use as a separator between the items. (Optional)

Data:
```js
collection = [
  'Amy Wong',
  'Bender',
  'Dr. Zoidberg',
  'Fry',
  'Hermes Conrad',
  'Leela',
  'Professor Farnsworth',
  'Scruffy'
]
```
Template:
```html
{{join collection " & "}}
```

Renders to:
```
Amy Wong & Bender & Dr. Zoidberg & Fry & Hermes Conrad & Leela & Professor Farnsworth & Scruffy
```

#### {{sort}}
_Returns the collection sorted._
Parameters: `none`

Data:
```js
collection = [
  'Amy Wong',
  'Bender',
  'Dr. Zoidberg',
  'Fry',
  'Hermes Conrad',
  'Leela',
  'Professor Farnsworth',
  'Scruffy'
]
```
Template:
```html
{{sort collection}}
```

Renders to:
```
Amy Wong, Bender, Dr. Zoidberg, Fry, Hermes Conrad, Leela, Professor Farnsworth, Scruffy
```

#### {{withSort}}
_Uses the sorted collection inside the block._
<br>Parameters: field `string` - String name of the field or property to sort by. (Optional)

Data:
```js
collection = [
  name: 'Leela'
  deliveries: 8021,

  name: 'Bender'
  deliveries: 239,

  name: 'Fry'
  deliveries: -12
]

```
Template:
```html
{{#withSort collection "deliveries"}}
  {{name}}: {{deliveries}} <br>
{{/withSort}}
```

Renders to:
```
Fry: -12
Bender: 239
Leela: 8021
```

#### {{length}}
_Returns the length of the collection._
<br>Parameters: `none`

Data:
```js
collection = [
  'Amy Wong',
  'Bender',
  'Dr. Zoidberg',
  'Fry',
  'Hermes Conrad',
  'Leela',
  'Professor Farnsworth',
  'Scruffy'
]

```
Template:
```html
{{length collection}}
```

Renders to:
```
8
```

#### {{lengthEqual}}
_Conditionally render a block based on the length of a collection._
<br>Parameters: length `int` - The value to test against. (Required)

Data:
```js
collection = [
  name: 'Leela'
  deliveries: 8021,

  name: 'Bender'
  deliveries: 239,

  name: 'Fry'
  deliveries: -12
]
```
Template:
```html
{{#lengthEqual collection 3}}
    There are 3 people in Planet Express.
{{else}}
    This is not Planet Express.
{{/lengthEqual}}
```

Renders to:
```
There are 3 people in Planet Express.
```

#### {{empty}}
_Conditionally render a block if the collection is empty._
<br>Parameters: `none`

Data:
```js
collection = []
```
Template:
```html
{{#empty collection}}
    Good news everyone!
{{else}}
    Bad news everyone!
{{/empty}}
```

Renders to:
```
Good news everyone!
```
#### {{any}}
_Conditionally render a block if the collection isn't empty. Opposite of `empty`_
<br>Parameters: `none`

Data:
```js
collection = ['Professor Farnsworth']
```
Template:s
```html
{{#any collection}}
  Good news everyone!
{{else}}
  Bad news everyone!
{{/any}}
```

Renders to:
```
Good news everyone!
```

#### {{inArray}}
_Conditionally render a block if a specified value is in the collection._
<br>Parameters: value `string|int` - A value to test against. (Required)

Data:
```js
collection = ['Professor Farnsworth', 'Fry', 'Bender']
```
Template:s
```html
{{#inArray collection "Fry"}}
  I'm walking on sunshine!
{{else}}
  I'm walking on darkness.
{{/any}}
```

Renders to:
```
I'm walking on sunshine!
```

#### {{eachIndex}}
_Current implementation of the default Handlebars loop helper {{#each}} adding index (0-based index) to the loop context._
<br>Parameters: `none`

Data:
```js
collection = ['Professor Farnsworth', 'Fry', 'Bender']
```
Template:s
```html
{{#eachIndex collection}}
  {{this}} is {{index}}
{{/eachIndex}}
```

Renders to:
```
Professor Farnsworth is 0, Fry is 1, Bender is 2
```

#### {{eachProperty}}
_Loop through an objects properties_
<br>Parameters: `none`

Data:
```js
TODO...
```
Template:s
```html
{{#eachProperty object}}
    {{property}}: {{value}}<br/>
{{/eachProperty }}
```

Renders to:
```
TODO...
```


## Math helpers
#### {{add}}
_Returns the sum of two numbers._
<br>Parameters: value `int` - The number to add to the expression. (Required)

Data:
```js
value = 5
```
Template:
```html
{{add value 5}}
```
Renders to:
```
10
```

#### {{subtract}}
_Returns the difference of two numbers. Opposite of `add`_
<br>Parameters: value `int` - The number to subtract from the expression. (Required)_

Data:
```js
value = 5
```
Template:
```html
{{subtract value 5}}
```
Renders to:
```
0
```

#### {{divide}}
_Returns the division of two numbers._
<br>Parameters: value `int` - The number to divide the expression. (Required)

Data:
```js
value = 5
```
Template:
```html
{{divide value 5}}
```
Renders to:
```
1
```

#### {{multiply}}
_Returns the multiplication of two numbers._
<br>Parameters: value `int` - The number to multiply the expression. (Required)

Data:
```js
value = 5

```
Template:
```html
{{multiply value 5}}
```
Renders to:
```
25
```

#### {{floor}}
_Returns the value rounded down to the nearest integer._
<br>Parameters: `none`

Data:
```js
value = 5.6
```
Template:
```html
{{floor value}}
```
Renders to:
```
5
```

#### {{ceil}}
_Returns the value rounded up to the nearest integer._
<br>Parameters: `none`

Data:
```js
value = 5.6
```
Template:
```html
{{ceil value}}
```
Renders to:
```
6
```

#### {{round}}
_Returns the value rounded to the nearest integer._
<br>Parameters: `none`

Data:
```js
value = 5.69
```
Template:
```html
{{round value}}
```
Renders to:
```
6
```

#### {{sum}}
_Returns the sum of multiple numbers. Similar to `{{#add}}` block helper but accepts multiple arguments._
<br>Parameters: `none`

Data:
```js
value = {
  a: 1,
  b: 2,
  c: 3
}
```
Template:
```html
{{sum value.a value.b value.c}}
```
Renders to:
```
6
```


## Numbers helpers
#### {{toFixed}}
_Returns exactly `digits` after the decimal place. The number is rounded if necessary, and the fractional part is padded with zeros if necessary so that it has the specified length._

Parameters: digits `int` - The number of digits to appear after the decimal point. (Optional)

Data:
```js
value = 5.53231
```

Template:
```html
{{toFixed value 3}}
```

Renders to:
```
5.532
```

#### {{toPrecision}}
_Returns the number in fixed-point or exponential notation rounded to `precision` significant digits._

Parameters: precision `int` - The number of digits. If omitted, it returns the entire number (without any formatting). (Optional)

Data:
```js
value = 555.322
```

Template:
```html
{{toPrecision value 4}}
```

Renders to:
```
555.3
```

#### {{toExponential}}
_Returns the number in exponential notation with one digit before the decimal point, rounded to `fractions` digits after the decimal point._

Parameters: fractions `int` - An integer specifying the number of digits after the decimal point. (Optional)

Data:
```js
value = 5
```

Template:
```html
{{toExponential value 5}}
```

Renders to:
```
5.00000e+0
```

#### {{toInt}}
_Returns an integer._

Parameters: `none`

Data:
```js
value = '22.2abc'
```

Template:
```html
{{toInt value}}
```

Renders to:
```
22
```

#### {{toFloat}}
_Returns a floating point number._

Parameters: `none`

Data:
```js
value = '22.2abc'
```

Template:
```html
{{toFloat value}}
```

Renders to:
```
22.2
```

#### {{toAbbr}}
_Returns the number in abbreviation formats based on a value. The number is rounded to a particular decimal place._

Parameters: digits `int` - The number of digits to appear after the decimal point. (Optional)

Default: `2`

Data:
```js
value = 123456789
```

Template:
```html
{{toAbbr value}}
```

Renders to:
```
123.457m
```

#### {{addCommas}}
_Adds commas to a number._

Parameters: `none`

Data:
```js
value = 2222222
```

Template:
```html
{{addCommas value}}
```

Renders to:
```
2,222,222
```


## Comparisons: "equal" helpers
#### {{is}}
_Conditionally render a block if the condition is true (if x = y)._

Parameters: `string|int` (the value to test against)
Default: `undefined`

Example #1:

Data:
```js
---
number = 5
---
```

Template:
```html
{{#is number 5}}
    Kiss my shiny metal ass!
{{else}}
    Never mind :(
{{/is}}
```

Renders to:
```
Kiss my shiny metal ass!
```

Example #2:

If you are using [Assemble](https://github.com/assemble/assemble), data from _YAML front matter_ or any specified `JSON` and/or `YAML` source files will get passed through to the context in your templates.

Data and Templates:
```yaml
---
page:
  title: About Us
---

{{#is page.title "Home"}}
    <h1> About Us </h1>
{{else}}
    <h1> My Blog </h1>
{{/is}}
```

Renders to:
```
<h1> About Us </h1>
```

#### {{if_eq}}
**Same as `is`, consider consolidating**
_Conditionally render a block if the condition is true (If x = y)._

Parameters: `none`
```html
{{#if_eq x compare=y}} ... {{/if_eq}}
```

#### {{isnt}}
_Conditionally render a block if the condition is false. Opposite of `is`._
<br>Parameters: value `string|int` - the value to test against.

Data:
```js
number = 5
```

Template:
```html
{{#isnt number 5}}
    Kiss my shiny metal ass!
{{else}}
    Never mind :(
{{/isnt}}
```

Renders to:
```
Never mind :(
```

#### {{or}}
_Conditionally render a block if one of the values is truthy._

Parameters: values `string|int` - the values to test against.

Data:
```js
great = no
magnificent = true
```

Template:
```html
{{#or great magnificent}}
    Kiss my shiny metal ass!
{{else}}
    Never mind :(
{{/or}}
```

Renders to:
```
Kiss my shiny metal ass!
```

#### {{and}}
_Conditionally render a block if both values are truthy._

Parameters: values `string|int` - the values to test against.

Data:
```js
great = true
magnificent = true
```

Template:
```html
{{#and great magnificent}}
    Kiss my shiny metal ass!
{{else}}
    Never mind :(
{{/and}}
```

Renders to:
```
Kiss my shiny metal ass!
```

#### {{unless_eq}}
**Same as `isnt`, consider consolidating**
_Conditionally render a block if the condition is false (Unless x = y). Opposite of `is`._

Parameters: `none`
```html
{{#unless_eq x compare=y}} ... {{/unless_eq}}
```



## Comparisons: "greater than" helpers
#### {{if_gt}}
_Conditionally render a block if the value is greater than a given number (If x > y)._
Parameters: `none`
```html
{{#if_gt x compare=y}} ... {{/if_gt}}
```

#### {{gt}}
**Same as `if_gt`, consider consolidating**
_Conditionally render a block if the value is greater than a given number (If x > y)._
<br>Parameters: value `string|int` - the value to test against.

Data:
```js
number = 5
```

Template:
```html
{{#gt number 8}}
    Kiss my shiny metal ass!
{{else}}
    Never mind :(
{{/gt}}
```

Renders to:
```
Never mind :(
```

#### {{unless_gt}}
_Unless greater than (Unless x > y)_
Parameters: `none`
```html
{{#unless_gt x compare=y}} ... {{/unless_gt}}
```

#### {{if_gteq}}
_Conditionally render a block if the value is greater or equal than a given number (If x >= y)._
Parameters: `none`
```html
{{#if_gteq x compare=y}} ... {{/if_gteq}}
```

#### {{gte}}
**Same as `if_gteq`, consider consolidating**
_Conditionally render a block if the value is greater or equal than a given number (If x >= y)._
<br>Parameters: value `string|int` - the value to test against.

```js
number = 5
```

Template:
```html
{{#gte number 5}}
    Kiss my shiny metal ass!
{{else}}
    Never mind :(
{{/gte}}
```

Renders to:
```
Kiss my shiny metal ass!
```


#### {{unless_gteq}}
_"Unless x >= y". Render block, unless given value is greater than or equal to._
Parameters: `none`

```html
{{#unless_gteq x compare=y}} ... {{/unless_gteq}}
```


## Comparisons: "less than" helpers
#### {{lt}}
_Conditionally render a block if the value is less than a given number. Opposite of `gt`._
<br>Parameters: value `string|int` - the value to test against.
```js
number = 5
```
```html
{{#lt number 3}}
    Kiss my shiny metal ass!
{{else}}
    Never mind :(
{{/lt}}
```

Renders to:
```
Never mind :(
```

#### {{lte}}
_Conditionally render a block if the value is less or equal than a given number. Opposite of `gte`._
<br>Parameters: value `string|int` - the value to test against.
```js
number = 5
```
```html
// Template
{{#lte number 5}}
    Kiss my shiny metal ass!
{{else}}
    Never mind :(
{{/lte}}
```

Renders to:
```
Kiss my shiny metal ass!
```

#### {{unless_lt}}
_Render block, unless value is less than a given number (Unless x < y)_.

Parameters: `none`
```html
{{#unless_lt x compare=y}} ... {{/unless_lt}}
```

#### {{unless_lteq}}
_Render block, unless value is less than or equal to a given number (Unless x <= y)_.

Parameters: `none`
```html
{{#unless_lteq x compare=y}} ... {{/unless_lteq}}
```



## Dates helpers
#### {{formatDate}}
_Formats a date into a string given a format. Accepts any value that can be passed to `new Date()`. This helper is a port of the [formatDate-js](http://https://github.com/michaelbaldry/formatDate-js) library by [Michael Baldry](https://github.com/michaelbaldry)._
<br>Parameters: format `string`, `required`
The format string, according to these tokens: [strftime](http://www.ruby-doc.org/core-1.9.3/Time.html#method-i-strftime)

Given this data:
```js
date = new Date()
```
And these templates:
```html
{{formatDate date "%m/%d/%Y"}}
{{formatDate date "%I:%M%p"}}
{{formatDate date "%F"}}
{{formatDate date "%Y%m%dT%H%M%S%z"}}
```
The output would be:
```
07/26/2012
11:38PM
2012-07-26
20120726T233805-0004
```

#### {{now}}
_Returns the current date._
<br>Parameters: format `string` - The format string, according to these tokens: [http://www.ruby-doc.org/core-1.9.3/Time.html#method-i-strftime]() (Optional)

Template:
```html
{{now}}
{{now "%m/%d/%Y"}}
```
Renders to:
```
Thu Jul 26 2012 23:41:02 GMT-0400 (AST)
07/26/2012
```

#### {{timeago}}
_Returns a human-readable time phrase from the given date._
<br>Parameters: `none`

Data:
```js
date = 'Thu Jul 22 2012 23:41:02 GMT-0400 (AST)'
```
Template:
```html
{{timeago date}}
```
Renders to:
```
4 days ago
```



## Inflections helpers
#### {{inflect}}
_Returns the plural or singular form of a word based on a count._

Parameters:
* singular `string` - The singular form of the word. (Required)
* plural `string` - The plural form of the word. (Required)
* include `boolean` - whether or not to include the count before the word. (Optional)

Data:
```js
enemies = 0
friends = 1
```
Template:
```html
{{inflect enemies "enemy" "enemies"}}
{{inflect friends "friend" "friends" true}}
```
Renders to:
```
enemies
1 friend
```

#### {{ordinalize}}
_Turns a number into an ordinal string. Taken from the templating library [Walrus](https://github.com/jeremyruppel/walrus) by [Jeremy Ruppel](https://github.com/jeremyruppel)._

Parameters: `none`

Template:
```html
{{ordinalize 3}}
{{ordinalize 1}}
{{ordinalize 22}}
```
Renders to:
```
3rd
1st
22nd
```


## Logging helpers
#### {{log}}
_Simple `console.log()`_

Parameters: `none`

```html
// Template
{{log "Hi console :)"}}
```

Renders to:
```bash
Hi console :)
```

#### {{debug}}
_Simple `console.debug()` that shows the current context._

Parameters: `none`

Data:
```js
collection = [
  name: 'Leela'
  deliveries: 8021,
  name: 'Bender'
  deliveries: 239,
  name: 'Fry'
  deliveries: 1
]
```

Template:
```html
{{#withFirst collection}}
   {{debug name}}
{{/withFirst}}
```

Renders to:
```json
Context: { deliveries: 8021, name: "Leela" }
Value: Leela
```

#### {{expandJSON}}
_Return a unique, JSON-formatted array of all file or directory paths that match the given globbing pattern(s)_

Parameters: `String`
Default: `undefined`

Template:
```html
{{expandJSON './src/**/*.md'}}
```

Renders to:
```json
[
  "./src/content/blockquotes.md",
  "./src/content/chapters/01-getting-started.md",
  "./src/content/chapters/02-language-features.md",
  "./src/content/chapters/03-advanced-materials.md",
  "./src/content/code.md",
  "./src/content/emphasis.md",
  "./src/content/headings.md",
  "./src/content/images.md",
  "./src/content/links.md",
  "./src/content/lists.md",
  "./src/content/markdown-here.md",
  "./src/content/paragraphs.md",
  "./src/content/post.md",
  "./src/content/reference-links.md",
  "./src/content/reference.md",
  "./src/content/tables.md",
  "./src/content/test.md"
]
```

#### {{expandYAML}}
_Return a unique, YAML-formatted array of all file or directory paths that match the given globbing pattern(s)_

Parameters: `String`

 Default: `undefined`

Template:
```html
{{expandYAML './src/**/*.md'}}
```

Renders to:
```yaml
- "./src/content/blockquotes.md"
- "./src/content/chapters/01-getting-started.md"
- "./src/content/chapters/02-language-features.md"
- "./src/content/chapters/03-advanced-materials.md"
- "./src/content/code.md"
- "./src/content/emphasis.md"
- "./src/content/headings.md"
- "./src/content/images.md"
- "./src/content/links.md"
- "./src/content/lists.md"
- "./src/content/markdown-here.md"
- "./src/content/paragraphs.md"
- "./src/content/post.md"
- "./src/content/reference-links.md"
- "./src/content/reference.md"
- "./src/content/tables.md"
- "./src/content/test.md"
```



## Miscellaneous helpers
#### {{default}}
_Provides a default or fallback value if a value doesn't exist._
<br>Parameters: defaultValue `string|int` - The default value to use. `title = ''`

Template:
```html
{{default title "No title available."}}
```
Renders to:
```
No title available.
```

#### {{noop}}

TODO...



---

## How Handlebars Helpers Work
Handlebars.js ships with some built-in helpers, such as `{{#each}}`, `{{#if}}` and `{{#unless}}`. Here is how helpers work:

* A Handlebars helper call is a simple identifier, followed by zero or more parameters (separated by space).
* Each parameter is a Handlebars expression.
* Handlebars helpers can be accessed from any context in a template.

[Handlebars.js](https://github.com/wycats/handlebars.js) is currently the default template library for [assemble](http://github.com/assemble/assemble).

### Creating Helpers

> Contributions welcome! Please consider adding your own helpers to this library.

Handlebars is advantageous over other templating libraries when it comes to creating your own custom helpers. Just register your function into Handlebars with the `Handlebars.registerHelper` method, and that helper will be available to any template you compile afterwards.

Handlebars allows two different kinds of helpers:

* **Expression helpers** are basically regular functions that take the name of the helper and the helper function as arguments. Once an expression helper is registered, it can be called anywhere in your templates, then Handlebars takes the expression's return value and writes it into the template.
* **Block helpers** There are a few block helpers included by default with Handlebars, `{{#each}}`, `{{#if}}` and `{{#unless}}`. Custom block helpers are registered the same way as exptression helpers, but the difference is that Handlebars will pass the contents of the block compiled into a function to the helper.

Also, if you use Assemble be sure to visit the [assemble docs](https://github.com/assemble/assemble/wiki/Helpers) to learn about registering custom helpers.


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using Grunt.



## Authors
* [Brian Woodward](http://github.com/doowb)
* [Jon Schlinkert](http://github.com/jonschlinkert)


## Credit
> Many of these helpers come from the following repos:

* [Handlebars Helpers, by Dan Harper](http://github.com/danharper)
* [Swag v0.2.1, by Elving Rodriguez](http://elving.github.com/swag/)


## Copyright and license
Copyright 2013 Assemble

[MIT License](LICENSE-MIT)

## Release History
* 2013-05-11			v0.2.3			File globbing added to some helpers. Including md and some file helpers.
* 2013-05-07			v0.2.0			A bunch of new tests for markdown and special helpers.  Refactored most of the rest of the helpers to separate functions from Handlebars registration.
* 2013-05-02			v0.1.32			Updated utils and a number of helpers, including value, property, and stringify.
* 2013-04-21			v0.1.31			Fixing relative helper
* 2013-04-20			v0.1.30			Refactoring helpers-collection module to separate the functions from the Handlebars helper registration process.
* 2013-04-16			v0.1.25			Adding defineSection and renderSection helpers to try to get sections populated in a layout from the page.
* 2013-04-07			v0.1.21			Add markdown helpers back, add more tests.
* 2013-04-06			v0.1.20			Generalized helpers structure, externalized utilities.
* 2013-04-05			v0.1.11			New authors and gist helpers, general cleanup and new tests.
* 2013-04-04			v0.1.10			Externalized utility javascript from helpers.js
* 2013-03-28			v0.1.8			Gruntfile updated with mocha tests for 71 helpers, bug fixes.
* 2013-03-18			v0.1.7			New path helper "relative", for resolving relative path from one absolute path to another.
* 2013-03-16			v0.1.3			New helpers, "formatPhoneNumber" and "eachProperty"
* 2013-03-15			v0.1.2			Update README.md with documentation, examples.
* 2013-03-06			v0.1.0			First commit.





---
Authored by [assemble](https://github.com/assemble/assemble)

_This file was generated using Grunt and [assemble](http://github.com/assemble/assemble) on Sun Jun 23 2013 18:44:17._




[download]: https://github.com/assemble/helper-lib/zipball/master


[org]: https://github.com/assemble
[assemble]: https://github.com/assemble/assemble
[issues]: https://github.com/assemble/assemble/issues
[wiki]: https://github.com/assemble/assemble/wiki



[config]: https://github.com/assemble/assemble/wiki/Configuration
[gruntfile]: https://github.com/assemble/assemble/wiki/Gruntfile
[tasks]: https://github.com/assemble/assemble/wiki/Task-and-Targets
[options]: https://github.com/assemble/assemble/wiki/Options


[templates]: https://github.com/assemble/assemble/wiki/Templates
[layouts]: https://github.com/assemble/assemble/wiki/Layouts
[pages]: https://github.com/assemble/assemble/wiki/Pages
[partials]: https://github.com/assemble/assemble/wiki/Partials


[content]: https://github.com/assemble/assemble/wiki/Content
[data]: https://github.com/assemble/assemble/wiki/Data
[yaml]: https://github.com/assemble/assemble/wiki/YAML-front-matter
[markdown]: https://github.com/assemble/assemble/wiki/Markdown


[helpers]: https://github.com/assemble/assemble/wiki/Helpers
[assets]: https://github.com/assemble/assemble/wiki/Assets
[collections]: https://github.com/assemble/assemble/wiki/Collections


[examples]: https://github.com/assemble/assemble-examples
[exampleReadme]: https://github.com/assemble/assemble-examples-readme
[exampleBasic]: https://github.com/assemble/assemble-examples-basic
[exampleAdvanced]: https://github.com/assemble/assemble-examples-advanced
[exampleGrid]: https://github.com/assemble/assemble-examples-grid
[exampleTable]: https://github.com/assemble/assemble-examples-table
[exampleForm]: https://github.com/assemble/assemble-examples-form
[exampleSite]: https://github.com/assemble/assemble-examples-site
[exampleSitemap]: https://github.com/assemble/assemble-examples-sitemap


[contribute]: https://github.com/assemble/assemble/wiki/Contributing-to-Assemble
[extend]: https://github.com/assemble/assemble/wiki/Extending-Assemble
[helpers-lib]: https://github.com/assemble/assemble/wiki/Helpers


[grunt]: http://gruntjs.com/
[upgrading]: http://gruntjs.com/upgrading-from-0.3-to-0.4
[getting-started]: http://gruntjs.com/getting-started
[package]: https://npmjs.org/doc/json.html


[assemble]: https://github.com/assemble/assemble
[pre]: https://github.com/assemble/pre
[dry]: https://github.com/assemble/dry
[assemble-github-com]: https://github.com/assemble/assemble.github.com
[assemble-examples-bootstrap]: https://github.com/assemble/assemble-examples-bootstrap
[assemble-internal]: https://github.com/assemble/assemble-internal
[assemble-less]: https://github.com/assemble/assemble-less
[assemble-examples-readme]: https://github.com/assemble/assemble-examples-readme
[grunt-toc]: https://github.com/assemble/grunt-toc
[helper-lib]: https://github.com/assemble/helper-lib
[grunt-dry]: https://github.com/assemble/grunt-dry
[assemble-examples]: https://github.com/assemble/assemble-examples
