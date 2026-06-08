// Creates an HTML element, optionally adds classes, 
// and fills it with text or child elements
export function elements(tag, className, children) 
{
  const element = document.createElement(tag);

  if (className) element.className = className;

  if (typeof children === "string" || typeof children === "number") 
  {
    element.textContent = children;
  } 
  else if (Array.isArray(children)) 
  {
    children.forEach(child => element.appendChild(child));
  } 
  else if (children instanceof Node) 
  {
    element.appendChild(children);
  }

  return element;
}