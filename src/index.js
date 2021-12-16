import { getRoot } from "./refs/root";
import { Platform } from "./platform";
import { isProduction } from "./environment";

var libName = 'Platform'

try
{
  if (getRoot()[libName] && isProduction()) {
    throw new Error('window["' + libName + '"] is already in use!');
  }

  getRoot()[libName] = Platform;
}
catch(err)
{
  console.error(err);
}
