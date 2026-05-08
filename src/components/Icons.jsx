import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import ArticleIcon from "@mui/icons-material/Article";
import AddCardIcon from "@mui/icons-material/AddCard";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import PaymentsIcon from "@mui/icons-material/Payments";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import PersonIcon from "@mui/icons-material/Person";
import SyncIcon from "@mui/icons-material/Sync";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import FeedIcon from "@mui/icons-material/Feed";

export function TradeIcon({ type }) {
  if (type === "tx") return <CurrencyExchangeIcon />;
  if (type === "buy") return <LocalMallIcon />;
  if (type === "sale") return <MonetizationOnIcon />;
  if (type === "send") return <TravelExploreIcon />;
  if (type === "bank") return <AccountBalanceIcon />;
  if (type === "balance") return <AccountBalanceWalletIcon />;
  if (type === "customer") return <EmojiPeopleIcon />;
  if (type === "account") return <ArticleIcon />;
  if (type === "payable") return <AddCardIcon />;
  if (type === "receivable") return <PaymentsIcon />;
  if (type === "rate") return <QueryStatsIcon />;
  if (type === "user") return <PersonIcon />;
  if (type === "transaction") return <SyncIcon />;
  if (type === "pending") return <AccessTimeIcon />;
  if (type === "done") return <CheckCircleOutlineIcon />;
  if (type === "open") return <FeedIcon />;

  return <MonetizationOnIcon />;
}
