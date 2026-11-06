// Project Detailed Case Studies Data
const projectDetails = {
  pulsefit: {
    title: "PulseFit Pro — Native Biometrics & Telemetry Engine",
    subtitle: "React Native 0.74+ • Kotlin Native Module • Health Connect SDK • SQLite",
    github: "https://github.com/niralipm1/pulsefit-tracker",
    overview: "PulseFit Pro is an offline-first fitness telemetry application that seamlessly bridges high-frequency heart-rate, cadence, and biometric sensors directly from Android Health Connect SDK and iOS HealthKit into React Native.",
    highlights: [
      "Custom C++ / Kotlin TurboModule bridge bypassing standard JSON serialization bottlenecks to achieve 60Hz sensor sampling without dropped frames.",
      "Offline-first dual-buffered SQLite architecture ensuring zero telemetry data loss in low-connectivity marathon/cycling tracking scenarios.",
      "Battery-efficient foreground service using WakeLocks and Android JobScheduler, maintaining sub-3.5% battery drain per hour of continuous tracking.",
      "Unit and integration tested with 95% branch coverage across native Kotlin modules."
    ],
    architecture: `// Kotlin Native Bridge Snippet
@ReactMethod
fun streamHealthRecords(startTime: Double, endTime: Double, promise: Promise) {
    coroutineScope.launch(Dispatchers.IO) {
        val request = ReadRecordsRequest(
            recordType = HeartRateRecord::class,
            timeRangeFilter = TimeRangeFilter.between(
                Instant.ofEpochMilli(startTime.toLong()),
                Instant.ofEpochMilli(endTime.toLong())
            )
        )
        val response = healthConnectClient.readRecords(request)
        promise.resolve(serializeRecords(response.records))
    }
}`
  },
  apex: {
    title: "Apex Commerce — Scalable Mobile Storefront",
    subtitle: "Flutter 3.22 • Dart • BLoC 8.1 • Stripe SDK • Clean Architecture",
    github: "https://github.com/niralipm1/apex-commerce",
    overview: "An enterprise-grade cross-platform mobile e-commerce platform built for high-throughput product catalogs (100,000+ SKUs) and friction-free checkout flows with Stripe PaymentSheet and Apple Pay / Google Pay.",
    highlights: [
      "Clean Architecture implementation strictly decoupling Presentation (BLoC), Domain (UseCases/Entities), and Data (Repository/Remote/Local).",
      "Optimized cached network image pipeline with LRU memory caching and progressive blur-up placeholders for lightning-fast catalog scrolling at 120 FPS.",
      "Stripe 3D-Secure 2.0 biometric authentication flow with automatic idempotency key handling to prevent duplicate charges.",
      "Zero client-side crashes reported across 50,000+ simulated stress test sessions."
    ],
    architecture: `// BLoC Event Handler
on<CheckoutProcessEvent>((event, emit) async {
  emit(CartCheckoutInProgress());
  try {
    final paymentIntent = await stripeRepository.createPaymentIntent(
      amount: event.totalCents,
      currency: 'usd',
    );
    await Stripe.instance.initPaymentSheet(paymentSheetParameters: ...);
    await Stripe.instance.presentPaymentSheet();
    emit(CartCheckoutSuccess(transactionId: paymentIntent.id));
  } catch (error) {
    emit(CartCheckoutFailure(message: error.toString()));
  }
});`
  },
  novapay: {
    title: "NovaPay Android — Native Modern Banking",
    subtitle: "100% Kotlin • Jetpack Compose • Room Encrypted • Coroutines & Flow",
    github: "https://github.com/niralipm1/novapay-android",
    overview: "A tier-1 fintech mobile banking application adhering strictly to Google's Modern Android Architecture guidelines. Features biometric account encryption, live transaction streaming, and Plaid API bank aggregation.",
    highlights: [
      "Modern Declarative UI with Jetpack Compose featuring custom Material 3 themed components and fluid physics-based gesture animations.",
      "Hardware-backed Android KeyStore encryption combined with SQLCipher Room database for military-grade financial data security.",
      "Unidirectional Data Flow (UDF) powered by Kotlin StateFlow and SharedFlow with complete testability.",
      "Comprehensive unit test suite leveraging MockK and Turbine for coroutine flow assertions."
    ],
    architecture: `// Jetpack Compose MVI StateFlow
@HiltViewModel
class WalletViewModel @Inject constructor(
    private val walletRepository: WalletRepository
) : ViewModel() {
    val uiState: StateFlow<WalletUiState> = walletRepository
        .getTransactionStream()
        .map { txList -> WalletUiState.Success(transactions = txList) }
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), WalletUiState.Loading)
}`
  },
  cloudpulse: {
    title: "CloudPulse Engine — High-Throughput Ingestion Microservice",
    subtitle: "Go (Golang) • gRPC Streaming • Redis Streams • PostgreSQL 16 • Docker",
    github: "https://github.com/niralipm1/cloudpulse-engine",
    overview: "A distributed event streaming service built to ingest and process high-frequency telemetry data points from millions of connected mobile and IoT clients with sub-5ms p99 latency.",
    highlights: [
      "Handles 120,000+ incoming telemetry events per second using bidirectional gRPC streaming and worker pool concurrency.",
      "Redis Streams consumer groups with automated claim-and-retry logic ensuring zero event drops during node failures.",
      "High-speed PostgreSQL bulk ingestion utilizing pgx COPY protocol instead of individual INSERT queries.",
      "Production-ready Prometheus metrics exporter and OpenTelemetry distributed tracing hooks."
    ],
    architecture: `// Go Streaming Ingestion
func (s *TelemetryServer) StreamEvents(stream pb.TelemetryService_StreamEventsServer) error {
    for {
        event, err := stream.Recv()
        if err == io.EOF { return stream.SendAndClose(&pb.StreamSummary{...}) }
        if err != nil { return err }
        
        s.streamBroker.Publish(stream.Context(), "events:telemetry", event)
    }
}`
  },
  devstudio: {
    title: "DevStudio Dashboard — Real-Time Telemetry Portal",
    subtitle: "Next.js 15 • React 19 • Tailwind CSS • Recharts • Server Components",
    github: "https://github.com/niralipm1/devstudio-dashboard",
    overview: "Full-stack real-time analytics web dashboard built for engineering leads to monitor mobile client crash rates, API latency percentiles (p50/p95/p99), and distributed microservice health.",
    highlights: [
      "Built on Next.js 15 App Router taking full advantage of React Server Components (RSC) and Suspense boundaries for zero client bundle bloat.",
      "Streaming server-side rendering (SSR) delivering first contentful paint (FCP) in under 280ms.",
      "Interactive data visualizations crafted with Recharts and customized Tailwind themes.",
      "End-to-end type safety shared between API routes and client presentation layers."
    ],
    architecture: `// Next.js App Router Server Component
export default async function MetricsPage() {
  const initialMetrics = await getLiveTelemetryMetrics();
  return (
    <Suspense fallback={<MetricsSkeleton />}>
      <DashboardView initialData={initialMetrics} />
    </Suspense>
  );
}`
  },
  "swiftui-audio": {
    title: "SwiftUI Audio Studio — Pro Mobile Audio DSP",
    subtitle: "Swift 6 • SwiftUI • AVFoundation • CoreAudio • Combine",
    github: "https://github.com/niralipm1/swiftui-audio-studio",
    overview: "Professional multi-track audio recording and real-time frequency spectrum visualizer engineered for iOS and iPadOS. Capable of studio-grade low-latency microphone processing.",
    highlights: [
      "Custom AVAudioEngine audio graph with real-time tap nodes analyzing FFT frequency spectrum data with zero audio buffer underruns.",
      "High-framerate 120 FPS SwiftUI Canvas visualizer rendering waveforms dynamically without CPU thermal throttling.",
      "Swift 6 strict concurrency compliance utilizing actors and Sendable protocol guarantees.",
      "CoreData persistence for track metadata, cue points, and multi-channel stem exports."
    ],
    architecture: `// Swift 6 Audio Tap Processing
@MainActor
final class AudioEngineService: ObservableObject {
    private let engine = AVAudioEngine()
    
    func installTap() {
        let inputNode = engine.inputNode
        let format = inputNode.outputFormat(forBus: 0)
        inputNode.installTap(onBus: 0, bufferSize: 1024, format: format) { [weak self] buffer, time in
            let levels = self?.calculateDecibelSpectrum(buffer: buffer) ?? []
            Task { @MainActor in
                self?.waveformLevels = levels
            }
        }
    }
}`
  },
  "fastapi-ml": {
    title: "FastAPI ML Gateway — Low-Latency AI Proxy",
    subtitle: "Python 3.12 • FastAPI • Pydantic v2 • Redis Cache • AsyncIO",
    github: "https://github.com/niralipm1/fastapi-ml-gateway",
    overview: "An enterprise-grade asynchronous API gateway designed for low-latency AI inference routing, token-by-token Server-Sent Events (SSE) streaming, and Redis semantic query caching.",
    highlights: [
      "Pydantic v2 data validation delivering 5x faster serialization compared to legacy frameworks.",
      "Redis semantic hash caching reducing duplicate LLM inference costs and latency by 45%.",
      "Dynamic provider failover with exponential backoff and circuit breaking.",
      "Fully asynchronous architecture handling 5,000+ concurrent streaming client connections."
    ],
    architecture: `// FastAPI Streaming Endpoint
@router.post("/v1/predict/stream")
async def stream_prediction(payload: InferenceRequest):
    cached = await redis_cache.get(payload.prompt_hash)
    if cached:
        return StreamingResponse(replay_stream(cached), media_type="text/event-stream")
        
    return StreamingResponse(
        inference_service.stream_tokens(payload),
        media_type="text/event-stream"
    )`
  },
  microcache: {
    title: "micro-cache-go — High-Concurrency Sharded LRU Library",
    subtitle: "Go (Golang) • Zero-Allocation • 256 Sharded Mutexes • TTL Expiry",
    github: "https://github.com/niralipm1/micro-cache-go",
    overview: "A lightweight, production-grade Go concurrency-safe in-memory cache library designed for high-RPS services where sync.Map or single-mutex caches experience catastrophic lock contention.",
    highlights: [
      "256-shard FNV-1a hashing architecture reducing mutex lock contention to near zero under heavy multi-core concurrency.",
      "True LRU eviction powered by an intrusive doubly-linked list with zero heap allocations on hot path gets/sets.",
      "Dual TTL expiration strategy: opportunistic lazy deletion upon access + lightweight proactive background sweeps.",
      "Benchmarks demonstrate 10,500,000+ operations/second on an 8-core CPU."
    ],
    architecture: `// Sharded Mutex Routing
func (c *Cache[K, V]) getShard(key string) *cacheShard[K, V] {
    hasher := fnv.New32a()
    hasher.Write([]byte(key))
    hash := hasher.Sum32()
    return c.shards[hash%uint32(c.shardCount)]
}`
  },
  biometrics: {
    title: "react-native-biometrics-kit — TurboModule Open-Source Package",
    subtitle: "TypeScript • Kotlin BiometricPrompt • Swift LocalAuthentication • Secure Enclave",
    github: "https://github.com/niralipm1/react-native-biometrics-kit",
    overview: "Modern React Native TurboModule library providing unified, high-assurance biometric authentication and hardware-backed cryptographic signing for fintech and healthcare apps.",
    highlights: [
      "Supports modern React Native New Architecture (TurboModules) with fallback to legacy bridge.",
      "Generates 2048-bit RSA and ECC P-256 keypairs inside Android StrongBox KeyStore and Apple Secure Enclave.",
      "Cryptographically signs challenge payloads upon biometric verification, preventing man-in-the-middle client spoofing.",
      "Comprehensive TypeScript typings with strict null-safety and platform feature detection."
    ],
    architecture: `// React Native Client Usage
import { BiometricsKit } from 'react-native-biometrics-kit';

const { available, biometryType } = await BiometricsKit.isSensorAvailable();
if (available) {
  const { signature } = await BiometricsKit.createSignature({
    promptMessage: 'Authorize $5,000 Wire Transfer',
    payload: transactionHash,
  });
  await api.verifyTransactionSignature(signature);
}`
  }
};

// DOM Content Loaded Handler
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    // Close on link click
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // Project Category Filters
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Project Modal Handling
  const modal = document.getElementById('projectModal');
  const modalContent = document.getElementById('modalContent');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  function openProjectModal(projectId) {
    const data = projectDetails[projectId];
    if (!data) return;

    modalContent.innerHTML = `
      <div class="modal-header-section">
        <h3 class="modal-title">${data.title}</h3>
        <span class="modal-subtitle">${data.subtitle}</span>
      </div>

      <div class="modal-section">
        <h4><span>🎯</span> Architectural Overview</h4>
        <p>${data.overview}</p>
      </div>

      <div class="modal-section">
        <h4><span>⚡</span> Engineering Rigor &amp; Key Milestones</h4>
        <ul>
          ${data.highlights.map(h => `<li>${h}</li>`).join('')}
        </ul>
      </div>

      <div class="modal-section">
        <h4><span>💻</span> Production Code Sample</h4>
        <pre class="modal-code-snippet"><code>${escapeHtml(data.architecture)}</code></pre>
      </div>

      <div class="modal-footer-cta">
        <a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          <span>View Source on GitHub</span>
        </a>
        <button class="btn btn-secondary" onclick="document.getElementById('projectModal').classList.remove('active');">
          Close Preview
        </button>
      </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.view-modal-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const projectId = btn.getAttribute('data-modal');
      openProjectModal(projectId);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeProjectModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeProjectModal();
    }
  });

  // Contact form submission handler
  window.handleContactSubmit = function() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const projectType = document.getElementById('projectType').value;
    const message = document.getElementById('message').value;

    showToast(`Thank you, ${name}! Your inquiry regarding "${projectType}" has been noted. Connecting directly via email...`);
    
    // Construct mailto link
    const subject = encodeURIComponent(`Project Consultation Inquiry - ${name}`);
    const body = encodeURIComponent(`Hi Nirali,\n\nName: ${name}\nEmail: ${email}\nScope: ${projectType}\n\nProject Overview:\n${message}\n`);
    
    setTimeout(() => {
      window.location.href = `mailto:niralplaystore1@gmail.com?subject=${subject}&body=${body}`;
    }, 1200);
  };

  // Toast notification helper
  function showToast(msg) {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>🚀</span> <span>${escapeHtml(msg)}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(20px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4500);
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.innerText = text;
    return div.innerHTML;
  }
});
