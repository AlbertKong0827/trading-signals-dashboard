export interface NewsItem {
    title: string;
    content: string;
    publish_time: string;
    source: string;
    url: string;
  }

interface NewsCardProps {
    news: NewsItem;
  }
  
  export default function NewsCard({ news }: NewsCardProps) {
    return (
      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <h3 className="text-lg font-semibold mb-2">{news.title}</h3>
        <p className="text-gray-600 mb-2">{news.content}</p>
        <div className="flex justify-between text-sm text-gray-500">
          <span>{news.source}</span>
          <span>{new Date(news.publish_time).toLocaleString()}</span>
        </div>
        <a 
          href={news.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline mt-2 inline-block"
        >
          Read more
        </a>
      </div>
    );
  }