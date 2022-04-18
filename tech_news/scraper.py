import requests
from parsel import Selector
import time
from tech_news.database import create_news


# Requisito 1
def fetch(url, timeout=3):
    time.sleep(1)
    try:
        response = requests.get(url, timeout=timeout)
    except requests.Timeout:
        return None
    if response.status_code != 200:
        return None
    else:
        return response.text


# Requisito 2
def scrape_novidades(html_content):
    selector = Selector(text=html_content)
    return selector.css("h3.tec--card__title a::attr(href)").getall()


# Requisito 3
def scrape_next_page_link(html_content):
    selector = Selector(text=html_content)
    return selector.css("div.tec--list__item ~ a::attr(href)").get()


# Requisito 4
# Para capturar algumas das informações foi consultado o repositório
# do colega Felipe Ventorim.
# Repositório: https://github.com/tryber/sd-013-c-tech-news/pull/93
def scrape_noticia(html_content):
    selector = Selector(text=html_content)

    url = selector.css("link[rel='canonical']::attr(href)").get()
    title = selector.css("div h1::text").get()
    timestamp = selector.css("#js-article-date::attr(datetime)").get()
    writer = selector.css(".z--font-bold *::text").get()
    writer = None if writer is None else writer.strip()
    shares_count = selector.css(
        "div.tec--toolbar__item::text"
    ).re_first(r"[0-9][0-9]")
    shares_count = 0 if shares_count is None else shares_count
    comments_count = selector.css("#js-comments-btn::attr(data-count)").get()
    comments_count = 0 if comments_count is None else int(comments_count)
    summary = "".join(selector.css(
        "div.tec--article__body > p:first-child *::text"
    ).getall())
    sources = [
        source[1:-1]  # para retirar os espaços.
        for source in selector.css("div.z--mb-16 a::text").getall()
    ]
    categories = [
        category[1:-1]  # para retirar os espaços.
        for category in selector.css(
            "div a.tec--badge--primary::text"
        ).getall()
    ]

    return {
        "url": url,
        "title": title,
        "timestamp": timestamp,
        "writer": writer,
        "shares_count": shares_count,
        "comments_count": comments_count,
        "summary": summary,
        "sources": sources,
        "categories": categories
    }


# Requisito 5
def get_tech_news(amount):
    url = "https://www.tecmundo.com.br/novidades"
    url_news_list = []
    while len(url_news_list) < amount:
        html_content = fetch(url)
        url_news_list.extend(scrape_novidades(html_content))
        next_page_url = scrape_next_page_link(html_content)
        url = next_page_url

    news_dict_list = []
    for url_news in url_news_list[:amount]:
        html_content = fetch(url_news)
        news = scrape_noticia(html_content)
        news_dict_list.append(news)

    create_news(news_dict_list)
    return news_dict_list
