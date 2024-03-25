// Mark the current page with boxes

// Function to generate random colors
function getRandomColor(index: number) {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getFixedColor(index: number) {
  var color = '#000000'
  return color
}

let labels: HTMLDivElement[] = [];

export function markPage() {
  var bodyRect = document.body.getBoundingClientRect();

  var items = Array.prototype.slice.call(
    document.querySelectorAll('*')
  ).map(function (element) {
    var vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    var vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

    var rects = [...element.getClientRects()].filter(bb => {
      var center_x = bb.left + bb.width / 2;
      var center_y = bb.top + bb.height / 2;
      var elAtCenter = document.elementFromPoint(center_x, center_y);

      return elAtCenter === element || element.contains(elAtCenter)
    }).map(bb => {
      const rect = {
        left: Math.max(0, bb.left),
        top: Math.max(0, bb.top),
        right: Math.min(vw, bb.right),
        bottom: Math.min(vh, bb.bottom)
      };
      return {
        ...rect,
        width: rect.right - rect.left,
        height: rect.bottom - rect.top
      }
    });

    var area = rects.reduce((acc, rect) => acc + rect.width * rect.height, 0);

    return {
      element: element,
      include:
        (element.tagName === "INPUT" || element.tagName === "TEXTAREA" || element.tagName === "SELECT") ||
        (element.tagName === "BUTTON" || element.tagName === "A" || (element.onclick != null) || window.getComputedStyle(element).cursor == "pointer") ||
        (element.tagName === "IFRAME" || element.tagName === "VIDEO" || element.tagName === "LI" || element.tagName === "TD" || element.tagName === "OPTION")
      ,
      area,
      rects,
      text: element.textContent.trim().replace(/\s{2,}/g, ' ')
    };
  }).filter(item =>
    item.include && (item.area >= 20)
  );

  // Only keep inner clickable items
  // first delete button inner clickable items
  const buttons = Array.from(document.querySelectorAll('button, a, input[type="button"], div[role="button"]'));

  //items = items.filter(x => !buttons.some(y => y.contains(x.element) && !(x.element === y) ));
  items = items.filter(x => !buttons.some(y => items.some(z => z.element === y) && y.contains(x.element) && !(x.element === y)));
  items = items.filter(x =>
    !(x.element.parentNode &&
      x.element.parentNode.tagName === 'SPAN' &&
      x.element.parentNode.children.length === 1 &&
      x.element.parentNode.getAttribute('role') &&
      items.some(y => y.element === x.element.parentNode)));

  items = items.filter(x => !items.some(y => x.element.contains(y.element) && !(x == y)))


  //function getFixedColor(index){
  //    var colors = ['#FF0000', '#00FF00', '#0000FF', '#000000']; // Red, Green, Blue, Black
  //    return colors[index % 4];
  //}


  // Lets create a floating border on top of these elements that will always be visible
  items.forEach(function (item, index) {
    item.rects.forEach((bbox) => {
      let newElement = document.createElement("div");
      var borderColor = getFixedColor(index);
      newElement.style.outline = `2px dashed ${borderColor}`;
      newElement.style.position = "fixed";
      newElement.style.left = bbox.left + "px";
      newElement.style.top = bbox.top + "px";
      newElement.style.width = bbox.width + "px";
      newElement.style.height = bbox.height + "px";
      newElement.style.pointerEvents = "none";
      newElement.style.boxSizing = "border-box";
      newElement.style.zIndex = "2147483647";
      // newElement.style.background = `${borderColor}80`;

      // Add floating label at the corner
      var label = document.createElement("span");
      label.textContent = index.toLocaleString();
      label.style.position = "absolute";
      //label.style.top = "-19px";
      label.style.top = Math.max(-19, -bbox.top) + "px";
      //label.style.left = "0px";
      label.style.left = Math.min(Math.floor(bbox.width / 5), 2) + "px";
      label.style.background = borderColor;
      label.style.color = "white";
      label.style.padding = "2px 4px";
      label.style.fontSize = "12px";
      label.style.borderRadius = "2px";
      newElement.appendChild(label);

      document.body.appendChild(newElement);
      labels.push(newElement);
      // item.element.setAttribute("-ai-label", label.textContent);
    });
  })

  // For the first way
  // return [labels, items.map(item => ({
  //     rect: item.rects[0] // assuming there's at least one rect
  // }))];

  // For the second way
  return [labels, items]
}


export default function get_web_react_element(fix_color: boolean) {
  // const selected_function = fix_color ? getFixedColor : getRandomColor;
  const [rects, items] = markPage();

  console.log({ rects, items })
  return [rects, items];
}