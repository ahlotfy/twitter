import headerTr from "./header.json";
import sideTr from "./side.json";
import explore from "./content/expolre.json";
import setting from "./setting.json";
import profile from "./profile.json";
import tweet from "./tweet.json";
import sign_out from "./sign_out.json";
import steps from "./steps_create_account/steps";
import notifications from "./Notifications/notifications.json";
import notFound from "./content/notFound.json";
import general from "./general.json";
import report from "./report.json";
import signIn from "./sign_in/signIn.json";
import thereAreNoFollowUp from "./content/ThereAreNoFollowUp.json";
const arTrans = {
  ...headerTr,
  ...sideTr,
  ...explore,
  ...setting,
  ...profile,
  ...tweet,
  ...sign_out,
  ...notifications,
  ...notFound,
  ...general,
  ...signIn,
  ...report,
  ...thereAreNoFollowUp,
  ...steps,
};
export default arTrans;
