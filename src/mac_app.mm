#import <Cocoa/Cocoa.h>
#import <WebKit/WebKit.h>
#include "server.hpp"
#include "database.hpp"
#include <iostream>
#include <thread>
#include <memory>

@interface AppDelegate : NSObject <NSApplicationDelegate, NSWindowDelegate>
@property (strong, nonatomic) NSWindow *window;
@property (strong, nonatomic) WKWebView *webView;
@end

@implementation AppDelegate

- (void)applicationDidFinishLaunching:(NSNotification *)notification {
    // 1. Configurar ventana nativa de macOS
    NSRect frame = NSMakeRect(100, 100, 1340, 880);
    NSUInteger styleMask = NSWindowStyleMaskTitled | NSWindowStyleMaskClosable |
                           NSWindowStyleMaskMiniaturizable | NSWindowStyleMaskResizable;

    self.window = [[NSWindow alloc] initWithContentRect:frame
                                              styleMask:styleMask
                                                backing:NSBackingStoreBuffered
                                                  defer:NO];

    [self.window setTitle:@"Taller-27 Bordados | Sistema Textil POS & Producción"];
    [self.window setMinSize:NSMakeSize(1024, 720)];
    [self.window center];
    [self.window setDelegate:self];

    // Color de barra superior (Brand Yellow #f5c518)
    [self.window setTitlebarAppearsTransparent:NO];

    // 2. Configurar WebKit WKWebView nativo
    WKWebViewConfiguration *config = [[WKWebViewConfiguration alloc] init];
    // Permitir contenido HTTP local (necesario para el servidor interno)
    [config.preferences setValue:@YES forKey:@"allowFileAccessFromFileURLs"];

    self.webView = [[WKWebView alloc] initWithFrame:[[self.window contentView] bounds] configuration:config];
    [self.webView setAutoresizingMask:(NSViewWidthSizable | NSViewHeightSizable)];

    [[self.window contentView] addSubview:self.webView];

    // Cargar via servidor HTTP interno (evita restricciones de WKWebView con file://)
    // El servidor ya fue iniciado en main() antes de que Cocoa arranque.
    // Pequeño delay para asegurar que el servidor esté escuchando.
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.4 * NSEC_PER_SEC)),
                   dispatch_get_main_queue(), ^{
        NSURL *url = [NSURL URLWithString:@"http://127.0.0.1:3027/index.html"];
        NSURLRequest *request = [NSURLRequest requestWithURL:url
                                                 cachePolicy:NSURLRequestReloadIgnoringLocalCacheData
                                             timeoutInterval:10.0];
        [self.webView loadRequest:request];
        NSLog(@"[WKWebView] Cargando http://127.0.0.1:3027/index.html");
    });

    // 3. Configurar Menú de macOS
    NSMenu *menubar = [NSMenu new];
    NSMenuItem *appMenuItem = [NSMenuItem new];
    [menubar addItem:appMenuItem];
    [NSApp setMainMenu:menubar];

    NSMenu *appMenu = [NSMenu new];
    NSString *quitTitle = [@"Salir de " stringByAppendingString:@"Taller-27"];
    NSMenuItem *quitMenuItem = [[NSMenuItem alloc] initWithTitle:quitTitle
                                                          action:@selector(terminate:)
                                                   keyEquivalent:@"q"];
    [appMenu addItem:quitMenuItem];
    [appMenuItem setSubmenu:appMenu];

    // Activar aplicación y poner al frente
    [NSApp activateIgnoringOtherApps:YES];
    [self.window makeKeyAndOrderFront:nil];

    std::cout << "[macOS] Ventana nativa de Taller-27 abierta exitosamente." << std::endl;
}

- (BOOL)applicationShouldTerminateAfterLastWindowClosed:(NSApplication *)sender {
    return YES;
}

@end

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        std::cout << "=================================================" << std::endl;
        std::cout << "   TALLER-27 BORDADOS - APLICACIÓN NATIVA MAC   " << std::endl;
        std::cout << "=================================================" << std::endl;

        // 1. Inicializar base de datos PostgreSQL
        Taller27::Database::instance().init();

        // 2. Iniciar servidor C++ en segundo plano en puerto 3027
        static Taller27::HttpServer server(3027, ".");
        if (!server.start()) {
            std::cerr << "[Error] No se pudo iniciar el servidor interno en el puerto 3027" << std::endl;
            return 1;
        }

        // 3. Iniciar aplicación Cocoa de macOS
        NSApplication *app = [NSApplication sharedApplication];
        [app setActivationPolicy:NSApplicationActivationPolicyRegular];

        AppDelegate *delegate = [[AppDelegate alloc] init];
        [app setDelegate:delegate];
        [app run];

        server.stop();
    }
    return 0;
}
