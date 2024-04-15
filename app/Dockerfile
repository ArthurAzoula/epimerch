FROM php:8.2-fpm-buster

RUN curl -1sLf 'https://dl.cloudsmith.io/public/symfony/stable/setup.deb.sh' | bash

WORKDIR /var/www/html

RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libpq-dev \
    symfony-cli \
    && docker-php-ext-install pdo pdo_pgsql

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

COPY . .

RUN composer install --no-scripts --no-autoloader

RUN composer dump-autoload --optimize

# Change the permissions of the cache directory
RUN chmod -R 777 var/cache var/log

EXPOSE 8000

CMD ["symfony", "server:start", "--no-tls", "--allow-http"]