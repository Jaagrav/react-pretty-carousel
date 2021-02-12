# React-Pretty-Carousel

Easily add beautiful carousels to your website in no time!

![React Pretty Carousel](https://user-images.githubusercontent.com/52719271/107816979-7f6adb80-6d9b-11eb-8535-2c8ccf4bb865.gif)

Check out the Demo on the docs [website](https://react-pretty-carousel.herokuapp.com/)!

## Installation

In order to install `react-pretty-carousel`, run this command in your terminal.

```
npm i react-pretty-carousel --save
```

Or

```
yarn add react-pretty-carousel
```

## Usage

![Usage](https://dev-to-uploads.s3.amazonaws.com/i/pucte4kmw5ssnebpapyj.png)

## `Props`

| Prop           | DataType  | Description                                                              |
| -------------- | --------- | ------------------------------------------------------------------------ |
| `items`        | `integer` | Number of items to display at once                                       |
| `mode`         | `string`  | Style of the carousel, can be either `normal` or `gallery`               |
| `showControls` | `boolean` | Show the dots and navigation buttons if `true`, and otherwise if `false` |

## `External Functions and Values`

You can summon and move/navigate through the carousel by importing and using the following functions:

```javascript
import {
  CarouselWrapper,
  prev,
  next,
  moveTo,
  switchTo,
  presentIndex,
} from "react-pretty-carousel";
```

| Function       | Description                                                  | Parameters |
| -------------- | ------------------------------------------------------------ | ---------- |
| `prev()`       | Move to the previous slide                                   | none       |
| `next()`       | Move to the next slide                                       | none       |
| `moveTo(5)`    | Move to a certain index/object with smooth animation         | integer    |
| `switchTo(5)`  | Abruptly move to a certain index/object                      | integer    |
| `presentIndex` | Get the present index of the carousel object being displayed | none       |

<br>
> This library unfortunately only supports React and React DOM v16.13.1, make sure you're using that version or else you might face unexpected errors.
