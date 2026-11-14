// Explicit icon map keeps the bundle small (only these icons are shipped).
// To use a new icon: import it from lucide-react and add it to the map.
import {
  Trophy, LayoutTemplate, ShieldCheck, Route, Gauge, Scale, ReceiptText, Sparkles, LayoutDashboard,
  FolderKanban, Activity, ChartPie, Workflow, ChartColumn, Wallet, Users, Columns3, Plug,
  ChartBarStacked, Link2, Bot, Landmark, Award, MessagesSquare, Braces, Palette, Fingerprint, Globe2,
  Coins, Map, Warehouse, KeyRound, Smartphone, ScrollText, Lock, EyeOff, UserCog, ArrowRight, Play,
  Menu, X, Check, CircleCheck, Mic, Send, Zap, Pause, Maximize2, ArrowUpRight, ChevronLeft, ChevronRight,
} from 'lucide-react'

const map = {
  Trophy, LayoutTemplate, ShieldCheck, Route, Gauge, Scale, ReceiptText, Sparkles, LayoutDashboard,
  FolderKanban, Activity, ChartPie, Workflow, ChartColumn, Wallet, Users, Columns3, Plug,
  ChartBarStacked, Link2, Bot, Landmark, Award, MessagesSquare, Braces, Palette, Fingerprint, Globe2,
  Coins, Map, Warehouse, KeyRound, Smartphone, ScrollText, Lock, EyeOff, UserCog, ArrowRight, Play,
  Menu, X, Check, CircleCheck, Mic, Send, Zap, Pause, Maximize2, ArrowUpRight, ChevronLeft, ChevronRight,
}

export default function Icon({ name, size = 20, strokeWidth = 2, ...rest }) {
  const C = map[name] || Sparkles
  return <C size={size} strokeWidth={strokeWidth} aria-hidden="true" {...rest} />
}
