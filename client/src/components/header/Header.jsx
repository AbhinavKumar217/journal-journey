import './header.css'

export default function Header() {
  return (
    <div className="header">
        <div className="headerTitles">
            <span className="headerTitleSm">Your Very Own Blog Website</span>
            <span className="headerTitleLg">JournalJourney</span>
        </div>
        <img src="https://wallpapercave.com/wp/wp5475488.jpg" alt="" className="headerImg" />
    </div>
  );
}
