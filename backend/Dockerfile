FROM python

COPY . ./src/

WORKDIR ./src/

RUN pip install -r requirements.txt

WORKDIR ./app

ENV DATABASE_PASSWORD=your_root_password_here
ENV DATABASE_IP=localhost

CMD ["uvicorn", "main:app", "--reload", "--host", "0.0.0.0"]