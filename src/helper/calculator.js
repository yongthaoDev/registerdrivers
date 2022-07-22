import { currency } from ".";

export const calculator = ({
  stateName,
  districtName,
  villageName,
  deliveryCheck,
  width,
  weight,
  customer,
  deposit,
  transferToProvince,
}) => {
  const deliveryPriceBelowFiveKG = 6000;
  const deliveryPriceUpperFiveKG = 10000;

  const deliveryPriceNearRange = 2500;
  const deliveryPriceMiddleRange = 5000;
  const deliveryPriceFarRange = 5000;

  const middle_kg = 15;
  const middle_kg_price = 2000;
  const middle_kg_price_plus = -8000;

  const pricePerKG = 1500;

  const staff_key = 1000;
  const depositDiscount = 0;

  const start_weight = 1;
  const start_width = 40;
  const start_price = 7000;

  const transferToProvince_price = 40; // percent

  let realPackagePrice = 0;

  if (weight <= start_weight) {
    realPackagePrice = start_price;
  }

  if (weight > start_weight) {
    realPackagePrice = start_price + (weight - start_weight) * pricePerKG;
  }

  if (weight >= middle_kg) {
    realPackagePrice =
      start_price +
      (weight - start_weight) * middle_kg_price +
      middle_kg_price_plus;
  }

  let max_width = (weight - start_weight) * 10 + start_width;
  let kg = 0;
  if (width > max_width) {
    let marginWidth = width - max_width;
    if (marginWidth <= 10) {
      realPackagePrice += pricePerKG;
    }
    if (marginWidth > 10 && marginWidth < 20) {
      realPackagePrice += pricePerKG * 2;
    }
    if (marginWidth >= 20) {
      kg = marginWidth / 10;
      realPackagePrice += pricePerKG * kg;
      let priceString = realPackagePrice.toString();
      priceString = priceString.substring(0, priceString.length - 3) + "000";
      realPackagePrice = parseInt(priceString);
    }
  }

  // ####### DELIVERY PRICE #############
  if (deliveryCheck === 1) {
    if (weight <= 5) {
      realPackagePrice += deliveryPriceBelowFiveKG;
    }
    if (weight > 5) {
      realPackagePrice += deliveryPriceUpperFiveKG;
    }
  }

  if (customer === false) {
    realPackagePrice += staff_key;
  }

  if (deposit === true) {
    realPackagePrice = realPackagePrice - depositDiscount;
  }

  let addedPrice = 0;
  if (transferToProvince === 1) {
    addedPrice = realPackagePrice * (transferToProvince_price / 100);
    realPackagePrice += addedPrice;
    let _realPackagePrice = realPackagePrice.toString();
    _realPackagePrice =
      _realPackagePrice.substring(0, _realPackagePrice.length - 3) + "000";
    realPackagePrice = parseInt(_realPackagePrice);
  }

  let new_weight = weight + kg;

  // ## NEW PRICE 06/04/2021
  if (new_weight >= 2 && new_weight < 5) {
    realPackagePrice += 1000;
  }
  if (new_weight >= 5 && new_weight <= 10) {
    realPackagePrice += 5000;
  }
  if (new_weight >= 11 && new_weight <= 20) {
    realPackagePrice += 8000;
  }
  if (new_weight >= 21 && new_weight <= 30) {
    realPackagePrice += 14000;
  }
  if (new_weight >= 31) {
    realPackagePrice += 16000;
  }

  let realPackagePriceString = realPackagePrice.toString();
  realPackagePriceString = realPackagePriceString.substring(
    realPackagePriceString.length - 3
  );

  if (realPackagePriceString === "500") {
    realPackagePrice += 500;
  }

  //13% up
  if (width >= 45 && weight >= 2) {
    realPackagePrice += realPackagePrice * 0.13;
    let stringPrice = currency(realPackagePrice);
    stringPrice = stringPrice.replace(/,/g, ".");
    stringPrice = Math.ceil(stringPrice);
    stringPrice = stringPrice + "000";
    stringPrice = parseInt(stringPrice);
    return stringPrice;
  }

  return realPackagePrice;
};

export const stateToSouthernEarth = (from_state, end_state) => {
  const southern = [3, 5, 10, 11, 12, 8, 9, 18];
  const northern = [13, 14, 15, 16, 17, 19, 21, 22, 23];
  const middle = [8, 9, 18];
  if (
    (southern.indexOf(from_state) !== -1 &&
      northern.indexOf(end_state) !== -1) ||
    (southern.indexOf(end_state) !== -1 && northern.indexOf(from_state) !== -1)
  ) {
    return 1;
  }
  return 0;
};
