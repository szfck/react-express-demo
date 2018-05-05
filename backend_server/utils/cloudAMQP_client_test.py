from cloudAMQP_client import CloudAMQPClient

CLOUDAMQP_URL = "amqp://iorkykpa:_FO71z5GKqr2aYGxMs6hQqIwpmNpIzw9@llama.rmq.cloudamqp.com/iorkykpa"

TEST_QUEUE_NAME = 'test'

def test_basic():
    client = CloudAMQPClient(CLOUDAMQP_URL, TEST_QUEUE_NAME)

    sentMsg = { 'test': 'demo' }
    client.sendMessage(sentMsg)
    client.sleep(10)
    receivedMsg = client.getMessage()
    assert sentMsg == receivedMsg
    print ("test_basci passed!")


if __name__ == "__main__":
    test_basic();
