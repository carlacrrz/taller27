#pragma once

#include <string>
#include <atomic>
#include <thread>

namespace Taller27 {

class HttpServer {
public:
    HttpServer(int port = 3000, const std::string& publicDir = ".");
    ~HttpServer();

    bool start();
    void stop();
    void wait();

    int getPort() const { return m_port; }

private:
    void listenLoop();
    void handleClient(int clientSocket);

    int m_port;
    std::string m_publicDir;
    int m_serverFd = -1;
    std::atomic<bool> m_running{false};
    std::thread m_thread;
};

} // namespace Taller27
