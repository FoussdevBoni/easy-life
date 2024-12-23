export function getPrice(distance) {
  if (distance<5) {
    return 250*distance
  }else if (distance<20&&distance>5) {
    return 200*distance
  }else if (distance>20) {
     return 175*distance
  }

}